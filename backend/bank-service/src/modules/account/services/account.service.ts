import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Account, AccountDocument } from '../schemas/account.schema';
import { Transaction } from '../../transactions/schemas/transaction.schema';
import { AccountConfigService } from './account-config.service';
import { TransactionService } from 'src/modules/transactions/services/transaction.service';
import { InvestmentService } from 'src/modules/investment/services/investment.service';
import { CreateAccountDto } from '../dtos/create-account.dto';
import {
  InsufficientFundsException,
  InvalidTransactionException,
} from 'src/shared/exeptions/bussiness.exeption';
import {
  ACCOUNT_CONFIG,
  TRANSACTION_TYPES,
} from 'src/shared/constants/app.constants';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>,
    private accountConfigService: AccountConfigService,
    @Inject(forwardRef(() => TransactionService))
    private transactionService: TransactionService,
    @Inject(forwardRef(() => InvestmentService))
    private investmentService: InvestmentService,
  ) {}

  async createAccount(
    createAccountDto: CreateAccountDto,
  ): Promise<AccountDocument> {
    const accountNumber = await this.generateAccountNumber();
    const newAccount = new this.accountModel({
      ...createAccountDto,
      accountNumber,
      availableBalance: createAccountDto.initialBalance || 0,
      investmentBalance: 0,
      roundingAccumulatedBalance: 0,
    });

    return newAccount.save();
  }

  private async generateAccountNumber(): Promise<string> {
    const random = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');
    const exists = await this.accountModel.findOne({ accountNumber: random });

    if (exists) {
      return this.generateAccountNumber();
    }

    return random;
  }

  async findOrCreateAccount(
    userId: string,
    userName: string,
  ): Promise<AccountDocument> {
    let account: AccountDocument = await this.accountModel
      .findOne({ userId })
      .populate('configuration');

    if (!account) {
      account = await this.createAccount({
        userId,
        clientName: userName,
        initialBalance: 0,
      } as CreateAccountDto);

      const config = await this.accountConfigService.createDefaultConfig(
        account._id as Types.ObjectId,
        userId,
      );

      account.configuration = config._id as Types.ObjectId;
      await account.save();
    }

    return account;
  }

  async processTransaction(
    accountId: string,
    amount: number,
    type: string,
    description: string,
  ): Promise<Transaction> {
    const account = await this.accountModel
      .findById(accountId)
      .populate('configuration');

    if (!account) {
      throw new NotFoundException('Cuenta');
    }

    let finalAmount = amount;
    let roundingAmount = 0;
    const config = account.configuration as any;

    switch (type) {
      case TRANSACTION_TYPES.DEPOSIT:
        account.availableBalance += amount;
        break;

      case TRANSACTION_TYPES.PURCHASE:
      case TRANSACTION_TYPES.WITHDRAWAL:
        if (account.availableBalance < amount) {
          throw new InsufficientFundsException();
        }

        const projectedBalance = account.availableBalance - finalAmount;

        if (
          type === TRANSACTION_TYPES.PURCHASE &&
          !(projectedBalance < config.minAccountBalance) &&
          config.automaticRoundingEnabled
        ) {
          roundingAmount =
            await this.accountConfigService.calculateRoundingAmount(
              amount,
              config,
            );
          finalAmount = amount + roundingAmount;
        }

        account.availableBalance -= finalAmount;
        if (roundingAmount > 0) {
          account.roundingAccumulatedBalance += roundingAmount;
        }
        break;

      default:
        throw new InvalidTransactionException('Tipo de transacción no válido');
    }

    const transaction = await this.transactionService.createTransaction({
      accountId: new Types.ObjectId(accountId),
      userId: account.userId,
      type,
      amount: amount,
      description,
      originalAmount: roundingAmount > 0 ? amount : undefined,
      roundingAmount: roundingAmount > 0 ? roundingAmount : undefined,
    });

    if (account.roundingAccumulatedBalance >= config.investmentThreshold) {
      await this.processInvestment(account, config);
    }

    await account.save();
    return transaction;
  }

  private async processInvestment(account: AccountDocument, config: any) {
    if (
      config.investmentTrigger ===
        ACCOUNT_CONFIG.INVESTMENT_TRIGGERS.ON_AMOUNT &&
      account.roundingAccumulatedBalance >= config.investmentThreshold
    ) {
      const investmentAmount = account.roundingAccumulatedBalance;

      await this.investmentService.createInvestmentFromRounding(
        account.userId,
        account._id as Types.ObjectId,
        investmentAmount,
        config.riskProfile,
        account.currentGoal,
      );

      account.roundingAccumulatedBalance = 0;
      account.investmentBalance += investmentAmount;
      await account.save();
    }
  }

  async getAccountSummary(userId: string) {
    const account = await this.accountModel
      .findOne({ userId })
      .populate('configuration')
      .populate('currentGoal');

    if (!account) {
      throw new NotFoundException('Cuenta');
    }

    const [transactions, investments, monthlyMetrics, graphData] =
      await Promise.all([
        this.transactionService.getUserTransactions(userId, { limit: 10 }),
        this.investmentService.getCurrentInvestments(
          account._id as Types.ObjectId,
        ),
        this.transactionService.getMonthlyMetrics(userId),
        this.transactionService.getGraphData(userId),
      ]);

    const investmentMetrics =
      await this.investmentService.getInvestmentMetrics(investments);

    return {
      account: {
        accountNumber: account.accountNumber,
        availableBalance: account.availableBalance,
        investmentBalance: account.investmentBalance,
        roundingAccumulatedBalance: account.roundingAccumulatedBalance,
      },
      metrics: {
        monthlySavings: monthlyMetrics.monthlySavings,
        monthlyIncome: monthlyMetrics.monthlyIncome,
        monthlyExpenses: monthlyMetrics.monthlyExpenses,
        totalInvested: investmentMetrics.totalInvested,
        currentReturn: investmentMetrics.averageReturnRate,
        returnAmount: investmentMetrics.totalReturns,
      },
      configuration: account.configuration,
      currentGoal: account.currentGoal,
      recentTransactions: transactions,
      statistics: {
        ...monthlyMetrics,
        investments: {
          total: investmentMetrics.totalInvested,
          returnRate: investmentMetrics.averageReturnRate,
          activeInvestments: investmentMetrics.activeInvestments,
        },
        graphData,
      },
    };
  }
}
