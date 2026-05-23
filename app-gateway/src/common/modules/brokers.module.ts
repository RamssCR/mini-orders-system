import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  RABBITMQ_NAME,
  RABBITMQ_QUEUE,
  RABBITMQ_URLS,
  TCP_HOST,
  TCP_NAME,
  TCP_PORT,
} from '#config/environment';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RABBITMQ_NAME,
        transport: Transport.RMQ,
        options: {
          urls: RABBITMQ_URLS,
          queue: RABBITMQ_QUEUE,
          queueOptions: { durable: false },
        },
      },
      {
        name: TCP_NAME,
        transport: Transport.TCP,
        options: {
          host: TCP_HOST,
          port: TCP_PORT,
        },
      },
    ]),
  ],
})
export class BrokersModule {}
