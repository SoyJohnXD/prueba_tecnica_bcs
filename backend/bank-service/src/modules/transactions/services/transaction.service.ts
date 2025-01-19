import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Transaction } from '../schemas/transaction.schema';

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
}
