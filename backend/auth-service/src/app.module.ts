import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      cache: true,
      expandVariables: true,
      validate: (config: Record<string, unknown>) => {
        const requiredKeys = [
          'MONGODB_URI',
          'JWT_SECRET',
          'JWT_EXPIRATION',
          'CLIENT_URL',
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
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
