import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  userId: string;

  @IsString()
  clientName: string;

  @IsNumber()
  @IsOptional()
  initialBalance?: number;
}
