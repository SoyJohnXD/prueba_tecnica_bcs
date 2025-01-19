import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SavingsController } from './controllers/savings.controller';
import { SavingsService } from './services/savings.service';
import { SavingsGoal, SavingsGoalSchema } from './schemas/savings-goal.schema';
import { InvestmentModule } from '../investment/investment.module';
import { TransactionModule } from '../transactions/transaction.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SavingsGoal.name, schema: SavingsGoalSchema },
    ]),
    InvestmentModule,
    TransactionModule,
  ],
  controllers: [SavingsController],
  providers: [SavingsService],
  exports: [SavingsService],
})
export class SavingsModule {}
