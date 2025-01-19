// src/app.module.ts
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

// Middleware y Cliente de Autenticación
import { AuthMiddleware } from './shared/auth/auth.middleware';
import { AuthClient } from './shared/auth/auth.client';

// Módulos de la Aplicación
import { AccountModule } from './modules/account/account.module';
import { TransactionModule } from './modules/transactions/transaction.module';
import { InvestmentModule } from './modules/investment/investment.module';
import { SavingsModule } from './modules/savings/savings.module';

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
          'PORT',
        ];

        for (const key of requiredKeys) {
          if (!config[key]) {
            throw new Error(`La variable de entorno ${key} es requerida`);
          }
        }
        return config;
      },
    }),

    // Configuración de MongoDB
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),

    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
      inject: [ConfigService],
    }),

    AccountModule,
    TransactionModule,
    InvestmentModule,
    SavingsModule,
  ],
  providers: [AuthClient],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
