import { IsOptional, IsEnum, IsObject } from 'class-validator';
import { ENTITY_STATUS } from 'src/shared/constants/app.constants';

export class UpdateAccountDto {
  @IsEnum(ENTITY_STATUS)
  @IsOptional()
  status?: ENTITY_STATUS;

  @IsObject()
  @IsOptional()
  configuration?: Record<string, any>;
}
