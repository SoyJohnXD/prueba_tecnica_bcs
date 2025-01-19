import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('test')
export class TestController {
  @Get('auth')
  async testAuth(@Req() request: Request) {
    return {
      message: 'Autenticación exitosa',
      user: request.user,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('public')
  async testPublic() {
    return {
      message: 'Endpoint público',
      timestamp: new Date().toISOString(),
    };
  }
}
