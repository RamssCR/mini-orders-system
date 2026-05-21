import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { PORT } from '#config/environment';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  await app.listen(PORT);
}

void bootstrap();
