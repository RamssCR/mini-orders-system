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
import { ORDERS_SERVICE_PROXY } from '#config/environment';
import type { Status } from './dtos/order-status';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDERS_SERVICE_PROXY)
    private readonly client: ClientProxy,
  ) {}

  @Get()
  findAll(@Query() queries: OrdersQueryDto) {
    return this.client.send('order.find_paginated', queries);
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.client.send('order.create', payload);
  }

  @Put(':id/status')
  changeStatus(@Param('id') orderId: string, @Query('status') status: Status) {
    return this.client.send('order.update_status', { id: orderId, status });
  }
}
