import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { TRANSACTION_TYPES } from 'src/shared/constants/app.constants';

@Schema({ timestamps: true })
export class Transaction extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Account' })
  accountId: Types.ObjectId;

  @Prop({ required: true })
  userId: string;

  @Prop({
    required: true,
    enum: TRANSACTION_TYPES,
  })
  type: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: Date.now })
  date: Date;

  @Prop()
  originalAmount?: number;

  @Prop()
  roundingAmount?: number;

  @Prop({ type: Types.ObjectId, ref: 'Investment' })
  investmentId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'SavingsGoal' })
  goalId?: Types.ObjectId;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
