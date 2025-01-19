import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class AccountConfig extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Account' })
  accountId: Types.ObjectId;

  @Prop({ required: true })
  userId: string;

  @Prop({ default: false })
  automaticRoundingEnabled: boolean;

  @Prop({
    required: true,
    enum: ['NEAREST_500', 'NEAREST_1000', 'NEAREST_5000', 'FIXED_AMOUNT'],
    default: 'NEAREST_500',
  })
  roundingType: string;

  @Prop({ required: true, default: 500 })
  roundingAmount: number;

  @Prop({ required: true, default: 5000 })
  maxRoundingAmount: number;

  @Prop({ required: true, default: 50000 })
  minAccountBalance: number;

  @Prop({
    required: true,
    enum: ['CONSERVATIVE', 'MODERATE', 'AGGRESSIVE'],
    default: 'CONSERVATIVE',
  })
  riskProfile: string;

  @Prop({
    type: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    required: true,
    default: { min: 2, max: 4 },
  })
  expectedReturn: { min: number; max: number };

  @Prop({ required: true, default: 1000 })
  investmentThreshold: number;

  @Prop({
    required: true,
    enum: ['ON_AMOUNT', 'ON_SCHEDULE'],
    default: 'ON_AMOUNT',
  })
  investmentTrigger: string;
}

export const AccountConfigSchema = SchemaFactory.createForClass(AccountConfig);
