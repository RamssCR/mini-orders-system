import { Controller, Get, Inject, Param } from '@nestjs/common';
import { TCP_NAME } from '#config/environment';
import { ClientProxy } from '@nestjs/microservices';

@Controller('audits')
export class AuditsController {
  constructor(
    @Inject(TCP_NAME)
    private readonly client: ClientProxy,
  ) {}

  @Get(':orderId')
  findByOrder(@Param('orderId') orderId: string) {
    return this.client.send('order.audits', orderId);
  }
}
