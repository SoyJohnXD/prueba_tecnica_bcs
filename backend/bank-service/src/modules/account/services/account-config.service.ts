import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AccountConfig } from '../schemas/account-config.schema';
import { UpdateConfigDto } from '../dtos/config/update-config.dto';

@Injectable()
export class AccountConfigService {
  constructor(
    @InjectModel(AccountConfig.name)
    private accountConfigModel: Model<AccountConfig>,
  ) {}

  async getConfigByUserId(userId: string): Promise<AccountConfig> {
    const config = await this.accountConfigModel.findOne({ userId });
    if (!config) {
      throw new NotFoundException('Configuración de cuenta no encontrada');
    }
    return config;
  }

  async updateConfig(
    userId: string,
    updateDto: UpdateConfigDto,
  ): Promise<AccountConfig> {
    const config = await this.accountConfigModel.findOneAndUpdate(
      { userId },
      { $set: updateDto },
      { new: true },
    );

    if (!config) {
      throw new NotFoundException('Configuración de cuenta no encontrada');
    }

    return config;
  }

  async createDefaultConfig(
    accountId: Types.ObjectId,
    userId: string,
  ): Promise<AccountConfig> {
    const defaultConfig = new this.accountConfigModel({
      accountId,
      userId,
      automaticRoundingEnabled: false,
      roundingType: 'NEAREST_500',
      roundingAmount: 500,
      maxRoundingAmount: 5000,
      minAccountBalance: 50000,
      riskProfile: 'CONSERVATIVE',
      expectedReturn: { min: 2, max: 4 },
      investmentThreshold: 1000,
      investmentTrigger: 'ON_AMOUNT',
    });

    return defaultConfig.save();
  }

  async calculateRoundingAmount(
    amount: number,
    config: AccountConfig,
  ): Promise<number> {
    if (!config.automaticRoundingEnabled) return 0;

    let roundingAmount = 0;
    const baseAmount = Math.ceil(amount);

    switch (config.roundingType) {
      case 'NEAREST_500':
        roundingAmount = Math.ceil(baseAmount / 500) * 500 - baseAmount;
        break;
      case 'NEAREST_1000':
        roundingAmount = Math.ceil(baseAmount / 1000) * 1000 - baseAmount;
        break;
      case 'NEAREST_5000':
        roundingAmount = Math.ceil(baseAmount / 5000) * 5000 - baseAmount;
        break;
      case 'FIXED_AMOUNT':
        roundingAmount = config.roundingAmount;
        break;
    }

    return Math.min(roundingAmount, config.maxRoundingAmount);
  }
}
