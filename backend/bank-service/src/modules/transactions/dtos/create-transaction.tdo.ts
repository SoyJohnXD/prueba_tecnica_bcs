import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { TRANSACTION_TYPES } from 'src/shared/constants/app.constants';

export class CreateTransactionDto {
  @IsEnum(TRANSACTION_TYPES)
  type: string;

  @IsNumber()
  amount: number;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  goalId?: string;
}
