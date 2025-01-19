import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthClient {
  private readonly authServiceUrl: string;
  private readonly serviceId: string;
  private readonly apiKey: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.authServiceUrl = this.configService.get<string>('AUTH_SERVICE_URL');
    this.serviceId = this.configService.get<string>('SERVICE_ID');
    this.apiKey = this.configService.get<string>('SERVICE_API_KEY');

    if (!this.authServiceUrl || !this.serviceId || !this.apiKey) {
      throw new Error(
        'Faltan configuraciones necesarias para el cliente de autenticación',
      );
    }
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.authServiceUrl}/verify-token`,
          { serviceId: this.serviceId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'x-service-id': this.serviceId,
              'x-api-key': this.apiKey,
            },
          },
        ),
      );
    } catch (error) {
      if (error.response) {
        throw new UnauthorizedException(
          error.response.data.message || 'Token inválido',
        );
      } else if (error.request) {
        throw new UnauthorizedException(
          'No se pudo contactar con el servicio de autenticación',
        );
      } else {
        throw new UnauthorizedException('Error al procesar la autenticación');
      }
    }
  }

  async getUserInfo(userId: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.authServiceUrl}/user-info`, {
          headers: {
            'x-user-id': userId,
            'x-service-id': this.serviceId,
            'x-api-key': this.apiKey,
          },
        }),
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        throw new UnauthorizedException(
          error.response.data.message ||
            'Error al obtener información del usuario',
        );
      } else if (error.request) {
        throw new UnauthorizedException(
          'No se pudo contactar con el servicio de autenticación',
        );
      } else {
        throw new UnauthorizedException('Error al procesar la solicitud');
      }
    }
  }
}
