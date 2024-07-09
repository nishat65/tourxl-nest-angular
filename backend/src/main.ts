import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { UniqueConstraintViolationFilter } from './filters/unique-constraint.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new UniqueConstraintViolationFilter());
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204,
    maxAge: 3600,
    preflightContinue: true,
    exposedHeaders: ['Content-Disposition'],
  });
  app.use(helmet());
  await app.listen(3000);
}
bootstrap();
