import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  ORDERS_SERVICE_PROXY,
  ORDERS_SERVICE_QUEUE,
  ORDERS_SERVICE_URLS,
} from '#config/environment';
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';

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
    ]),
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
