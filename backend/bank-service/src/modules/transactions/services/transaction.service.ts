import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Transaction } from '../schemas/transaction.schema';
import { TRANSACTION_TYPES } from 'src/shared/constants/app.constants';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
  ) {}

  async createTransaction(data: {
    accountId: Types.ObjectId;
    userId: string;
    type: string;
    amount: number;
    description: string;
    originalAmount?: number;
    roundingAmount?: number;
    investmentId?: Types.ObjectId;
    goalId?: Types.ObjectId;
  }): Promise<Transaction> {
    const transaction = new this.transactionModel(data);
    return transaction.save();
  }

  async getTransactionById(transactionId: string): Promise<Transaction> {
    const transaction = await this.transactionModel
      .findById(transactionId)
      .populate('investmentId')
      .populate('goalId');

    if (!transaction) {
      throw new NotFoundException('Transacción no encontrada');
    }

    return transaction;
  }

  async getUserTransactions(
    userId: string,
    filters: {
      startDate?: Date;
      endDate?: Date;
      type?: string;
      minAmount?: number;
      maxAmount?: number;
      limit?: number;
    } = {},
  ): Promise<Transaction[]> {
    const query: any = { userId };

    if (filters.startDate || filters.endDate) {
      query.date = {};
      if (filters.startDate) query.date.$gte = filters.startDate;
      if (filters.endDate) query.date.$lte = filters.endDate;
    }

    if (filters.type) {
      query.type = filters.type;
    }

    if (filters.minAmount || filters.maxAmount) {
      query.amount = {};
      if (filters.minAmount) query.amount.$gte = filters.minAmount;
      if (filters.maxAmount) query.amount.$lte = filters.maxAmount;
    }

    return this.transactionModel
      .find(query)
      .sort({ date: -1 })
      .populate('investmentId')
      .populate('goalId');
  }

  async getMonthlyTransactions(
    accountId: Types.ObjectId,
  ): Promise<Transaction[]> {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    return this.transactionModel
      .find({
        accountId,
        date: { $gte: startOfMonth },
      })
      .sort({ date: -1 });
  }

  async getMonthlyMetrics(userId: string) {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const pipeline = [
      {
        $match: {
          userId,
          date: { $gte: startOfMonth },
        },
      },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
          totalWithRounding: {
            $sum: { $add: ['$amount', { $ifNull: ['$roundingAmount', 0] }] },
          },
          count: { $sum: 1 },
        },
      },
    ];

    const stats = await this.transactionModel.aggregate(pipeline);

    const monthlyMetrics = {
      monthlySavings: 0,
      monthlyIncome: 0,
      monthlyExpenses: 0,
      totalRounding: 0,
    };

    stats.forEach((stat) => {
      switch (stat._id) {
        case TRANSACTION_TYPES.DEPOSIT:
          monthlyMetrics.monthlyIncome = stat.total;
          monthlyMetrics.monthlySavings += stat.total;
          break;
        case TRANSACTION_TYPES.PURCHASE:
        case TRANSACTION_TYPES.WITHDRAWAL:
          monthlyMetrics.monthlyExpenses += stat.totalWithRounding;
          monthlyMetrics.monthlySavings -= stat.totalWithRounding;
          break;
        case TRANSACTION_TYPES.INVESTMENT:
          break;
      }
    });

    return monthlyMetrics;
  }

  async getTransactionStats(userId: string) {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const pipeline = [
      { $match: { userId, date: { $gte: startOfMonth } } },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
          avgAmount: { $avg: '$amount' },
        },
      },
    ];

    const stats = await this.transactionModel.aggregate(pipeline);

    return {
      monthly: stats.reduce((acc, stat) => {
        acc[stat._id.toLowerCase()] = {
          total: stat.total,
          count: stat.count,
          average: stat.avgAmount,
        };
        return acc;
      }, {}),
    };
  }

  async getGraphData(userId: string) {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const pipeline = [
      {
        $match: {
          userId,
          date: { $gte: startOfMonth },
        },
      },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: '$date' },
            type: '$type',
          },
          total: { $sum: '$amount' },
          totalWithRounding: {
            $sum: { $add: ['$amount', { $ifNull: ['$roundingAmount', 0] }] },
          },
        },
      },
      {
        $group: {
          _id: '$_id.day',
          data: {
            $push: {
              type: '$_id.type',
              total: '$total',
              totalWithRounding: '$totalWithRounding',
            },
          },
        },
      },
      {
        $sort: { _id: 1 as 1 | -1 },
      },
    ];

    const rawData = await this.transactionModel.aggregate(pipeline);

    const formattedData = rawData.map((dayData) => {
      const metrics = {
        day: dayData._id,
        deposits: 0,
        expenses: 0,
        investments: 0,
      };

      dayData.data.forEach((item) => {
        switch (item.type) {
          case TRANSACTION_TYPES.DEPOSIT:
            metrics.deposits += item.total;
            break;
          case TRANSACTION_TYPES.PURCHASE:
          case TRANSACTION_TYPES.WITHDRAWAL:
            metrics.expenses += item.totalWithRounding;
            break;
          case TRANSACTION_TYPES.INVESTMENT:
            metrics.investments += item.total;
            break;
        }
      });

      return metrics;
    });

    return formattedData;
  }
}
