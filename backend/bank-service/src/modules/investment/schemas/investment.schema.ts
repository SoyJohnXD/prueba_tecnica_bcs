import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { INVESTMENT_STATUS } from 'src/shared/constants/app.constants';

@Schema({ timestamps: true })
export class Investment extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Account' })
  accountId: Types.ObjectId;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: false, type: Types.ObjectId, ref: 'SavingsGoal' })
  goalId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  investmentDate: Date;

  @Prop({ required: true })
  expectedReturnRate: number;

  @Prop({ default: 0 })
  actualReturn: number;

  @Prop({
    required: true,
    enum: Object.values(INVESTMENT_STATUS),
    default: INVESTMENT_STATUS.ACTIVE,
  })
  status: string;
}

export const InvestmentSchema = SchemaFactory.createForClass(Investment);
