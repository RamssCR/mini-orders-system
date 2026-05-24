import { AUDIT_SERVICE_HOST, AUDIT_SERVICE_PORT } from '#config/environment';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: AUDIT_SERVICE_HOST,
        port: AUDIT_SERVICE_PORT,
      },
    },
  );
  const logger = new Logger('AuditMicroservice');

  await app.listen();
  logger.log(
    `Audit Microservice is listening via TCP on ${AUDIT_SERVICE_HOST}:${AUDIT_SERVICE_PORT}`,
  );
}

void bootstrap();
