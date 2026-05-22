import { DatabaseTransactionService } from '#common/providers/query-runner.service';
import { Module } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrdersController],
  providers: [DatabaseTransactionService, OrdersService],
  exports: [TypeOrmModule],
})
export class OrdersModule {}
