import { Controller, Get, Patch, Body, Req, Query } from '@nestjs/common';
import { AccountConfigService } from '../services/account-config.service';
import { UpdateConfigDto } from '../dtos/config/update-config.dto';
import { RequestWithUser } from 'src/shared/auth/interfaces/auth.interface';

@Controller('accounts/config')
export class AccountConfigController {
  constructor(private readonly accountConfigService: AccountConfigService) {}

  @Get()
  async getMyConfig(@Req() request: RequestWithUser) {
    const { user } = request.user;
    return this.accountConfigService.getConfigByUserId(user.userId);
  }

  @Patch()
  async updateMyConfig(
    @Req() request: RequestWithUser,
    @Body() updateDto: UpdateConfigDto,
  ) {
    const { user } = request.user;
    return this.accountConfigService.updateConfig(user.userId, updateDto);
  }

  @Get('calculate-rounding')
  async calculateRoundingAmount(
    @Req() request: RequestWithUser,
    @Query('amount') amount: string,
  ) {
    const { user } = request.user;
    const config = await this.accountConfigService.getConfigByUserId(
      user.userId,
    );

    const roundingAmount =
      await this.accountConfigService.calculateRoundingAmount(
        parseInt(amount),
        config,
      );

    return {
      originalAmount: amount,
      roundingAmount,
      totalAmount: parseInt(amount) + roundingAmount,
    };
  }
}
