import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthClient {
  // Almacenamos las configuraciones que necesitaremos frecuentemente
  private readonly authServiceUrl: string;
  private readonly serviceId: string;
  private readonly apiKey: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    // Inicializamos las configuraciones desde las variables de entorno
    this.authServiceUrl = this.configService.get<string>('AUTH_SERVICE_URL');
    this.serviceId = this.configService.get<string>('SERVICE_ID');
    this.apiKey = this.configService.get<string>('SERVICE_API_KEY');

    // Validamos que tengamos todas las configuraciones necesarias
    if (!this.authServiceUrl || !this.serviceId || !this.apiKey) {
      throw new Error(
        'Faltan configuraciones necesarias para el cliente de autenticación',
      );
    }
  }

  /**
   * Verifica un token de usuario con el servicio de autenticación
   * @param token El token JWT a verificar
   * @returns La información del usuario si el token es válido
   */
  async verifyToken(token: string): Promise<any> {
    try {
      // Realizamos la petición al auth-service
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

      // Si la petición es exitosa, retornamos la información del usuario
      return response.data.user;
    } catch (error) {
      // Manejamos diferentes tipos de errores que pueden ocurrir
      if (error.response) {
        // El servidor respondió con un error
        throw new UnauthorizedException(
          error.response.data.message || 'Token inválido',
        );
      } else if (error.request) {
        // No se pudo contactar con el servidor
        throw new UnauthorizedException(
          'No se pudo contactar con el servicio de autenticación',
        );
      } else {
        // Error en la configuración de la petición
        throw new UnauthorizedException('Error al procesar la autenticación');
      }
    }
  }

  /**
   * Obtiene información detallada de un usuario
   * @param userId ID del usuario
   * @returns Información completa del usuario
   */
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
      // Manejamos los errores de manera similar al método anterior
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
