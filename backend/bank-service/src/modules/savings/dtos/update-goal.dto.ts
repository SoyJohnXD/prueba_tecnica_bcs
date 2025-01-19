import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateGoalDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  targetAmount?: number;

  @IsDateString()
  @IsOptional()
  deadline?: string;

  @IsString()
  @IsOptional()
  category?: string;
}
