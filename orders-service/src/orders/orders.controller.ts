import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrdersQueryDto } from './dtos/orders-query.dto';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('orders')
  findAll(@Payload() queries: OrdersQueryDto) {
    return this.ordersService.findPaginated(queries);
  }

  @MessagePattern('place.order')
  create(@Payload() payload: CreateOrderDto) {
    return this.ordersService.create(payload);
  }

  @MessagePattern('order.status')
  changeStatus(@Payload('id') id: string) {
    return this.ordersService.updateStatus(id);
  }
}
