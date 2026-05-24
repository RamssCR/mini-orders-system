import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  AUDIT_SERVICE_HOST,
  AUDIT_SERVICE_PORT,
  AUDIT_SERVICE_PROXY,
  ORDERS_SERVICE_PROXY,
  ORDERS_SERVICE_QUEUE,
  ORDERS_SERVICE_URLS,
} from '#config/environment';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDERS_SERVICE_PROXY,
        transport: Transport.RMQ,
        options: {
          urls: ORDERS_SERVICE_URLS,
          queue: ORDERS_SERVICE_QUEUE,
          queueOptions: { durable: false },
        },
      },
      {
        name: AUDIT_SERVICE_PROXY,
        transport: Transport.TCP,
        options: {
          host: AUDIT_SERVICE_HOST,
          port: AUDIT_SERVICE_PORT,
        },
      },
    ]),
  ],
})
export class BrokersModule {}
