import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TCP_HOST, TCP_PORT } from '#config/environment';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: TCP_HOST,
        port: TCP_PORT,
      },
    },
  );
  const logger = new Logger('AuditMicroservice');

  await app.listen();
  logger.log(
    `Audit Microservice is listening via TCP on ${TCP_HOST}:${TCP_PORT}`,
  );
}

void bootstrap();
