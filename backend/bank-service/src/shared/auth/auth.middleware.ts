import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AuthClient } from './auth.client';
import { RequestWithUser } from './interfaces/auth.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authClient: AuthClient) {}

  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader) {
        throw new UnauthorizedException(
          'No se proporcionó token de autorización',
        );
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('Formato de token inválido');
      }

      const userData = await this.authClient.verifyToken(token);

      req.user = userData;

      next();
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
