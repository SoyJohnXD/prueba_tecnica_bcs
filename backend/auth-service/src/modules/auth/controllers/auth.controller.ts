import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Get,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { Verify2FADto } from '../dto/verify-2fa.dto';
import { ServiceAuthGuard } from '../guards/service-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('verify-2fa')
  async verify2FA(@Body() verify2FADto: Verify2FADto) {
    return this.authService.verify2FA(verify2FADto);
  }

  @UseGuards(ServiceAuthGuard)
  @Post('verify-token')
  async verifyToken(
    @Headers('authorization') authHeader: string,
    @Body('serviceId') serviceId: string,
  ) {
    const token = authHeader?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    const userData = await this.authService.verifyServiceToken(
      token,
      serviceId,
    );
    return { isValid: true, user: userData };
  }

  @UseGuards(ServiceAuthGuard)
  @Get('user-info')
  async getUserInfo(
    @Headers('x-user-id') userId: string,
    @Headers('x-service-id') serviceId: string,
  ) {
    return this.authService.getUserInfo(userId, serviceId);
  }
}
