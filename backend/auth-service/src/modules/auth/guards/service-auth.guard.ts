import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ServiceAuthGuard implements CanActivate {
  private readonly serviceApiKeys: Map<string, string>;

  constructor(private configService: ConfigService) {
    this.serviceApiKeys = new Map([
      ['bank-service', this.configService.get('BANK_SERVICE_API_KEY')],
    ]);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const serviceId = request.headers['x-service-id'];
    const apiKey = request.headers['x-api-key'];

    if (!serviceId || !apiKey) {
      throw new UnauthorizedException(
        'Credenciales de servicio no proporcionadas',
      );
    }

    const validApiKey = this.serviceApiKeys.get(serviceId);
    if (!validApiKey || validApiKey !== apiKey) {
      throw new UnauthorizedException('Credenciales de servicio inválidas');
    }

    return true;
  }
}
