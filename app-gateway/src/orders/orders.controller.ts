import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrdersQueryDto } from './dtos/orders-query.dto';
import { RABBITMQ_NAME } from '#config/environment';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(RABBITMQ_NAME)
    private readonly client: ClientProxy,
  ) {}

  @Get()
  findAll(@Query() queries: OrdersQueryDto) {
    return this.client.send('orders', queries);
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.client.send('place.order', payload);
  }

  @Put()
  changeStatus(@Param('orderId') orderId: string) {
    return this.client.emit('order.status', { orderId });
  }
}
