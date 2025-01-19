import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class SavingsGoal extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Account' })
  accountId: Types.ObjectId;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  targetAmount: number;

  @Prop({ required: true })
  currentAmount: number;

  @Prop({ required: true })
  deadline: Date;

  @Prop({ required: true })
  category: string;

  @Prop({
    required: true,
    enum: ['IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
    default: 'IN_PROGRESS',
  })
  status: string;

  @Prop({ default: 0 })
  monthlyReturn: number;

  @Prop({ default: 0 })
  estimatedReturn: number;

  @Prop({
    type: String,
    enum: ['ON_TRACK', 'DELAYED', 'AHEAD'],
    default: 'ON_TRACK',
  })
  completionProjection: string;

  @Prop({ default: 0 })
  roundingContribution: number;

  @Prop({ default: 0 })
  directContribution: number;

  @Prop({ default: 0 })
  investmentReturns: number;

  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

export const SavingsGoalSchema = SchemaFactory.createForClass(SavingsGoal);
