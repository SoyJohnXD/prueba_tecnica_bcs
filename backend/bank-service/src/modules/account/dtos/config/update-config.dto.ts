import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  Min,
  Max,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ExpectedReturnDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  min: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  max: number;
}

export class UpdateConfigDto {
  @IsBoolean()
  @IsOptional()
  automaticRoundingEnabled?: boolean;

  @IsEnum(['NEAREST_500', 'NEAREST_1000', 'NEAREST_5000', 'FIXED_AMOUNT'])
  @IsOptional()
  roundingType?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  roundingAmount?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  maxRoundingAmount?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  minAccountBalance?: number;

  @IsEnum(['CONSERVATIVE', 'MODERATE', 'AGGRESSIVE'])
  @IsOptional()
  riskProfile?: string;

  @ValidateNested()
  @Type(() => ExpectedReturnDto)
  @IsOptional()
  expectedReturn?: ExpectedReturnDto;

  @IsNumber()
  @Min(0)
  @IsOptional()
  investmentThreshold?: number;

  @IsEnum(['ON_AMOUNT', 'ON_SCHEDULE'])
  @IsOptional()
  investmentTrigger?: string;
}
