import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { UniqueConstraintViolationFilter } from './filters/unique-constraint.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new UniqueConstraintViolationFilter());
  app.enableCors();
  app.use(helmet());
  await app.listen(3000);
}
bootstrap();
