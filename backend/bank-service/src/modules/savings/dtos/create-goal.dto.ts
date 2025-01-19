import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateGoalDto {
  @IsString()
  accountId: string;

  @IsString()
  name: string;

  @IsNumber()
  targetAmount: number;

  @IsDateString()
  deadline: string;

  @IsString()
  category: string;
}
