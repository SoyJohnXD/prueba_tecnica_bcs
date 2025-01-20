import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './shared/filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [
      configService.get('BANK_SERVICE_URL'),
      configService.get('CLIENT_URL'),
    ],
    credentials: true,
  });

  app.useGlobalFilters(new GlobalExceptionFilter());
  const port = configService.get('PORT') || 3001;
  await app.listen(port);
  console.log(`Bank service is running on port ${port}`);
}
bootstrap();
