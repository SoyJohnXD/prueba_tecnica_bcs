import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ENTITY_STATUS } from 'src/shared/constants/app.constants';

export type AccountDocument = Account & Document;

@Schema({ timestamps: true })
export class Account {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, unique: true })
  accountNumber: string;

  @Prop({ required: true })
  clientName: string;

  @Prop({ default: ENTITY_STATUS.ACTIVE })
  status: ENTITY_STATUS;

  @Prop({ required: true, default: 0 })
  availableBalance: number;

  @Prop({ required: true, default: 0 })
  investmentBalance: number;

  @Prop({ required: true, default: 0 })
  roundingAccumulatedBalance: number;

  @Prop({ type: Types.ObjectId, ref: 'AccountConfig' })
  configuration: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'SavingsGoal' })
  currentGoal: Types.ObjectId;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
