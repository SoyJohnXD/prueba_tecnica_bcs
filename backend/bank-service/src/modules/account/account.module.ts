import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';
import { Account, AccountSchema } from './schemas/account.schema';
import { AccountConfigService } from './services/account-config.service';
import {
  AccountConfig,
  AccountConfigSchema,
} from './schemas/account-config.schema';
import { TransactionModule } from '../transactions/transaction.module';
import { InvestmentModule } from '../investment/investment.module';
import { AccountConfigController } from './controllers/account-config.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema },
      { name: AccountConfig.name, schema: AccountConfigSchema },
    ]),
    forwardRef(() => TransactionModule),
    forwardRef(() => InvestmentModule),
  ],
  controllers: [AccountController, AccountConfigController],
  providers: [AccountService, AccountConfigService],
  exports: [AccountService, AccountConfigService],
})
export class AccountModule {}
