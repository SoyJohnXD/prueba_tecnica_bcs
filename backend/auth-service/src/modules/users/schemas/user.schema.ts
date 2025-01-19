import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

interface VerificationCode {
  code: string;
  expiresAt: Date;
}

@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.password;
      delete ret.twoFactorSecret;
      delete ret.verificationCodes;
      return ret;
    },
    virtuals: true,
  },
  toObject: {
    transform: (doc, ret) => {
      delete ret.password;
      delete ret.twoFactorSecret;
      delete ret.verificationCodes;
      return ret;
    },
    virtuals: true,
  },
})
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ type: String, enum: ['CC', 'CE', 'PP'] })
  documentType: string;

  @Prop({ unique: true })
  documentNumber: string;

  @Prop()
  phoneNumber: string;

  @Prop({ type: Boolean, default: false })
  twoFactorEnabled: boolean;

  @Prop()
  twoFactorSecret?: string;

  @Prop({ type: [{ code: String, expiresAt: Date }], select: false })
  verificationCodes?: VerificationCode[];

  @Prop({ type: Date })
  lastLogin?: Date;

  @Prop({ type: [String], default: ['user'] })
  roles: string[];

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: Number, default: 0 })
  loginAttempts: number;

  @Prop()
  lockUntil?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
