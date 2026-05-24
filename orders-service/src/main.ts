import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ORDERS_SERVICE_QUEUE, ORDERS_SERVICE_URLS } from '#config/environment';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ORDERS_SERVICE_URLS,
        queue: ORDERS_SERVICE_QUEUE,
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();
}

void bootstrap();
