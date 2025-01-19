import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('test')
export class TestController {
  @Get('auth')
  async testAuth(@Req() request: Request) {
    // Este endpoint devolverá la información del usuario si la autenticación fue exitosa
    return {
      message: 'Autenticación exitosa',
      user: request.user,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('public')
  async testPublic() {
    // Este endpoint será público para comparar
    return {
      message: 'Endpoint público',
      timestamp: new Date().toISOString(),
    };
  }
}
