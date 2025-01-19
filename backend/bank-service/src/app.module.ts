import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { AuthMiddleware } from './shared/auth/auth.middleware';
import { AuthClient } from './shared/auth/auth.client';
import { TestModule } from './modules/test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config: Record<string, unknown>) => {
        const requiredKeys = [
          'MONGODB_URI',
          'AUTH_SERVICE_URL',
          'SERVICE_API_KEY',
          'SERVICE_ID',
        ];

        for (const key of requiredKeys) {
          if (!config[key]) {
            throw new Error(`La variable de entorno ${key} es requerida`);
          }
        }
        return config;
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    HttpModule,
    TestModule,
  ],
  providers: [AuthClient],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'test/public', method: RequestMethod.GET },
        { path: 'api/health', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
