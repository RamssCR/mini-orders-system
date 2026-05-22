import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RABBITMQ_QUEUE, RABBITMQ_URLS } from '#config/environment';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: RABBITMQ_URLS,
        queue: RABBITMQ_QUEUE,
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();
}

void bootstrap();
