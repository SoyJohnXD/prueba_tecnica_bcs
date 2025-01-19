import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  Req,
} from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { Request } from 'express';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('my-transactions')
  async getMyTransactions(
    @Req() request: Request,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('type') type?: string,
    @Query('minAmount') minAmount?: number,
    @Query('maxAmount') maxAmount?: number,
  ) {
    const user = request.user as any;
    return this.transactionService.getUserTransactions(user.userId, {
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      type,
      minAmount,
      maxAmount,
    });
  }

  @Get('my-transactions/stats')
  async getMyTransactionStats(@Req() request: Request) {
    const user = request.user as any;
    return this.transactionService.getTransactionStats(user.userId);
  }

  @Get(':id')
  async getTransaction(@Param('id') id: string, @Req() request: Request) {
    const transaction = await this.transactionService.getTransactionById(id);
    const user = request.user as any;

    if (transaction.userId !== user.userId) {
      throw new NotFoundException('Transacción no encontrada');
    }

    return transaction;
  }
}
