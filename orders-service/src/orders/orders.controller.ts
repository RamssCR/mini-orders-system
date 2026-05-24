import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { ChangeStatusDto } from './dtos/change-status.dto';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrdersQueryDto } from './dtos/orders-query.dto';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('order.find_paginated')
  findAll(@Payload() queries: OrdersQueryDto) {
    return this.ordersService.findPaginated(queries);
  }

  @MessagePattern('order.create')
  create(@Payload() payload: CreateOrderDto) {
    return this.ordersService.create(payload);
  }

  @MessagePattern('order.update_status')
  changeStatus(@Payload() payload: ChangeStatusDto) {
    return this.ordersService.updateStatus(payload);
  }
}
