import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvestmentService } from './services/investment.service';
import { Investment, InvestmentSchema } from './schemas/investment.schema';
import { TransactionModule } from '../transactions/transaction.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Investment.name, schema: InvestmentSchema },
    ]),
    TransactionModule,
  ],
  providers: [InvestmentService],
  exports: [InvestmentService],
})
export class InvestmentModule {}
