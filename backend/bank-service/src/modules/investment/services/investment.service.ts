import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Investment } from '../schemas/investment.schema';
import { TransactionService } from '../../transactions/services/transaction.service';
import {
  ENTITY_STATUS,
  TRANSACTION_TYPES,
} from 'src/shared/constants/app.constants';

@Injectable()
export class InvestmentService {
  constructor(
    @InjectModel(Investment.name) private investmentModel: Model<Investment>,
    private transactionService: TransactionService,
  ) {}

  async createInvestmentFromRounding(
    userId: string,
    accountId: Types.ObjectId,
    amount: number,
    riskProfile: string,
    goalId?: Types.ObjectId,
  ): Promise<Investment> {
    const investment = new this.investmentModel({
      userId,
      accountId,
      goalId,
      amount,
      investmentDate: new Date(),
      expectedReturnRate: this.getReturnRateByRiskProfile(riskProfile),
      status: ENTITY_STATUS.ACTIVE,
    });

    await this.transactionService.createTransaction({
      accountId,
      userId,
      type: TRANSACTION_TYPES.INVESTMENT,
      amount,
      description: 'Inversión automática por redondeo',
      goalId,
      investmentId: investment._id as Types.ObjectId,
    });

    return investment.save();
  }

  private getReturnRateByRiskProfile(riskProfile: string): number {
    const rates = {
      CONSERVATIVE: 3, // 2-4%
      MODERATE: 6, // 4-8%
      AGGRESSIVE: 10, // 8-12%
    };
    return rates[riskProfile] || rates.CONSERVATIVE;
  }

  async getCurrentInvestments(
    accountId: Types.ObjectId,
    goalId?: Types.ObjectId,
  ): Promise<Investment[]> {
    const query: any = {
      accountId,
      status: ENTITY_STATUS.ACTIVE,
    };

    if (goalId) {
      query.goalId = goalId;
    }

    return this.investmentModel.find(query);
  }

  async withdrawInvestment(
    investmentId: Types.ObjectId,
    userId: string,
  ): Promise<Investment> {
    const investment = await this.investmentModel.findOne({
      _id: investmentId,
      userId,
      status: ENTITY_STATUS.ACTIVE,
    });

    if (!investment) {
      throw new NotFoundException('Inversión');
    }

    investment.status = TRANSACTION_TYPES.WITHDRAWAL;
    await investment.save();

    await this.transactionService.createTransaction({
      accountId: investment.accountId,
      userId,
      type: TRANSACTION_TYPES.RETURN,
      amount: investment.amount + investment.actualReturn,
      description: 'Retorno de inversión',
      goalId: investment.goalId,
      investmentId: investment._id as Types.ObjectId,
    });

    return investment;
  }

  async getInvestmentMetrics(investments: Investment[]) {
    const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
    const totalReturns = investments.reduce(
      (sum, inv) => sum + inv.actualReturn,
      0,
    );
    const avgReturn =
      totalInvested > 0 ? (totalReturns / totalInvested) * 100 : 0;

    return {
      totalInvested,
      totalReturns,
      averageReturnRate: avgReturn,
      activeInvestments: investments.length,
    };
  }

  async simulateReturns(): Promise<void> {
    const activeInvestments = await this.investmentModel.find({
      status: ENTITY_STATUS.ACTIVE,
    });

    for (const investment of activeInvestments) {
      const monthlyReturn =
        (investment.amount * investment.expectedReturnRate) / 12 / 100;
      investment.actualReturn += monthlyReturn;
      await investment.save();
    }
  }
}
