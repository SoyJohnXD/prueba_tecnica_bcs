import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api/auth');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: [
      configService.get('BANK_SERVICE_URL'),
      configService.get('CLIENT_URL'),
    ],
    credentials: true,
  });

  app.use(cookieParser());

  const port = configService.get('PORT') || 3002;
  await app.listen(port);
  console.log(`Auth service is running on port ${port}`);
}
bootstrap();
