import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class Verify2FADto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(6)
  verificationCode: string;

  @IsString()
  @IsNotEmpty()
  tempToken: string;
}
