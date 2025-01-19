import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SavingsGoal } from '../schemas/savings-goal.schema';
import { CreateGoalDto } from '../dtos/create-goal.dto';
import { UpdateGoalDto } from '../dtos/update-goal.dto';
import { InvestmentService } from '../../investment/services/investment.service';
import { TransactionService } from '../../transactions/services/transaction.service';
import { InvalidTransactionException } from 'src/shared/exeptions/bussiness.exeption';
import {
  ERROR_MESSAGES,
  SAVINGS_GOAL,
  TRANSACTION_TYPES,
} from 'src/shared/constants/app.constants';

@Injectable()
export class SavingsService {
  constructor(
    @InjectModel(SavingsGoal.name) private savingsGoalModel: Model<SavingsGoal>,
    private investmentService: InvestmentService,
    private transactionService: TransactionService,
  ) {}

  async createGoal(
    userId: string,
    createGoalDto: CreateGoalDto,
  ): Promise<SavingsGoal> {
    const deadline = new Date(createGoalDto.deadline);
    if (deadline <= new Date()) {
      throw new InvalidTransactionException(
        ERROR_MESSAGES.GOAL.INVALID_DEADLINE,
      );
    }

    const goal = new this.savingsGoalModel({
      userId,
      ...createGoalDto,
      currentAmount: 0,
      status: SAVINGS_GOAL.STATUS.IN_PROGRESS,
    });

    await this.updateGoalProjection(goal);
    return goal.save();
  }

  async getGoalById(goalId: string, userId: string): Promise<SavingsGoal> {
    const goal = await this.savingsGoalModel.findOne({ _id: goalId, userId });

    if (!goal) {
      throw new NotFoundException(ERROR_MESSAGES.GOAL.NOT_FOUND);
    }

    await this.updateGoalProgress(goal);
    return goal;
  }

  async getUserGoals(userId: string): Promise<SavingsGoal[]> {
    const goals = await this.savingsGoalModel.find({ userId });
    await Promise.all(goals.map((goal) => this.updateGoalProgress(goal)));
    return goals;
  }

  async updateGoal(
    goalId: string,
    userId: string,
    updateDto: UpdateGoalDto,
  ): Promise<SavingsGoal> {
    const goal = await this.savingsGoalModel.findOne({ _id: goalId, userId });

    if (!goal) {
      throw new NotFoundException(ERROR_MESSAGES.GOAL.NOT_FOUND);
    }

    Object.assign(goal, updateDto);
    await this.updateGoalProjection(goal);
    return goal.save();
  }

  async processRoundingContribution(
    goalId: Types.ObjectId,
    amount: number,
  ): Promise<void> {
    const goal = await this.savingsGoalModel.findById(goalId);

    if (!goal) {
      throw new NotFoundException(ERROR_MESSAGES.GOAL.NOT_FOUND);
    }

    goal.roundingContribution += amount;
    goal.currentAmount += amount;

    await this.updateGoalProgress(goal);
    await goal.save();
  }

  async processDirectContribution(
    goalId: Types.ObjectId,
    amount: number,
    userId: string,
    description: string,
  ): Promise<void> {
    const goal = await this.savingsGoalModel.findById(goalId);

    if (!goal) {
      throw new NotFoundException(ERROR_MESSAGES.GOAL.NOT_FOUND);
    }

    await this.transactionService.createTransaction({
      accountId: goal.accountId,
      userId,
      type: TRANSACTION_TYPES.DEPOSIT,
      amount,
      description,
      goalId,
    });

    goal.directContribution += amount;
    goal.currentAmount += amount;

    await this.updateGoalProgress(goal);
    await goal.save();
  }

  private async updateGoalProgress(goal: SavingsGoal): Promise<void> {
    const investments = await this.investmentService.getCurrentInvestments(
      goal.accountId,
      goal._id as Types.ObjectId,
    );
    const investmentMetrics =
      await this.investmentService.getInvestmentMetrics(investments);

    goal.investmentReturns = investmentMetrics.totalReturns;
    goal.currentAmount =
      goal.roundingContribution +
      goal.directContribution +
      goal.investmentReturns;

    if (goal.currentAmount >= goal.targetAmount) {
      goal.status = SAVINGS_GOAL.STATUS.COMPLETED;
    }

    await this.updateGoalProjection(goal);
  }

  private async updateGoalProjection(goal: SavingsGoal): Promise<void> {
    const today = new Date();
    const deadline = new Date(goal.deadline);
    const startDate = goal.createdAt || today;

    const totalDays = Math.ceil(
      (deadline.getTime() - startDate.getTime()) / (1000 * 3600 * 24),
    );

    const remainingDays = Math.ceil(
      (deadline.getTime() - today.getTime()) / (1000 * 3600 * 24),
    );
    if (remainingDays <= 0) {
      goal.completionProjection = SAVINGS_GOAL.PROJECTION.DELAYED;
      return;
    }
    if (!goal.createdAt) {
      goal.completionProjection = SAVINGS_GOAL.PROJECTION.ON_TRACK;
      return;
    }

    const expectedProgress = (totalDays - remainingDays) / totalDays;
    const actualProgress = goal.currentAmount / goal.targetAmount;

    if (actualProgress >= expectedProgress * 1.1) {
      goal.completionProjection = SAVINGS_GOAL.PROJECTION.AHEAD;
    } else if (actualProgress <= expectedProgress * 0.9) {
      goal.completionProjection = SAVINGS_GOAL.PROJECTION.DELAYED;
    } else {
      goal.completionProjection = SAVINGS_GOAL.PROJECTION.ON_TRACK;
    }
  }
}
