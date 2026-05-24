import { ALLOWED_ORIGINS, NODE_ENV, PORT } from '#config/environment';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger('AppGateway');

  app.setGlobalPrefix('/api/v1');
  app.set('query parser', 'extended');
  app.use(helmet());
  app.enableCors({
    origin: NODE_ENV === 'development' ? '*' : ALLOWED_ORIGINS,
  });

  await app.listen(PORT);
  logger.log(`App running at ${await app.getUrl()}`);
}

void bootstrap();
