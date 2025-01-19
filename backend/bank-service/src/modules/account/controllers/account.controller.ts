import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { AccountConfigService } from '../services/account-config.service';
import { RequestWithUser } from 'src/shared/auth/interfaces/auth.interface';

@Controller('accounts')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly accountConfigService: AccountConfigService,
  ) {}

  @Get('my-account')
  async getMyAccount(@Req() request: RequestWithUser) {
    const { user } = request.user;
    if (!user) {
      throw new UnauthorizedException('Usuario no autenticado');
    }
    return this.accountService.findOrCreateAccount(
      user.userId,
      `${user.firstName} ${user.lastName}`,
    );
  }

  @Get('my-account/summary')
  async getMyAccountSummary(@Req() request: RequestWithUser) {
    const { user } = request.user;
    return this.accountService.getAccountSummary(user.userId);
  }

  @Post('my-account/transactions')
  async createTransaction(
    @Req() request: RequestWithUser,
    @Body()
    transactionData: {
      amount: number;
      type: string;
      description: string;
    },
  ) {
    const { user } = request.user;
    const account = await this.accountService.findOrCreateAccount(
      user.userId,
      `${user.firstName} ${user.lastName}`,
    );

    return this.accountService.processTransaction(
      account._id as string,
      transactionData.amount,
      transactionData.type,
      transactionData.description,
    );
  }
}
