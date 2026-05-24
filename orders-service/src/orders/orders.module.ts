import {
  AUDIT_SERVICE_HOST,
  AUDIT_SERVICE_PORT,
  AUDIT_SERVICE_PROXY,
} from '#config/environment';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DatabaseTransactionService } from '#common/providers/query-runner.service';
import { Module } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUDIT_SERVICE_PROXY,
        transport: Transport.TCP,
        options: {
          host: AUDIT_SERVICE_HOST,
          port: AUDIT_SERVICE_PORT,
        },
      },
    ]),
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [OrdersController],
  providers: [DatabaseTransactionService, OrdersService],
  exports: [TypeOrmModule],
})
export class OrdersModule {}
