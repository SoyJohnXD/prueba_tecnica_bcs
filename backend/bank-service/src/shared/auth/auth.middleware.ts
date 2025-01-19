import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthClient } from './auth.client';

// Extendemos el tipo Request de una manera más moderna
interface RequestWithUser extends Request {
  user?: any;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authClient: AuthClient) {}

  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException(
          'No se proporcionó token de autorización',
        );
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('Formato de token inválido');
      }

      // Verificamos el token con el auth-service
      const userData = await this.authClient.verifyToken(token);

      // Agregamos la información del usuario al request
      req.user = userData;

      next();
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
