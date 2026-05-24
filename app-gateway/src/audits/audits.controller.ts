import { Controller, Get, Inject, Param } from '@nestjs/common';
import { AUDIT_SERVICE_PROXY } from '#config/environment';
import { ClientProxy } from '@nestjs/microservices';

@Controller('audits')
export class AuditsController {
  constructor(
    @Inject(AUDIT_SERVICE_PROXY)
    private readonly client: ClientProxy,
  ) {}

  @Get(':orderId')
  findByOrder(@Param('orderId') orderId: string) {
    return this.client.send('order.audit.find_all', orderId);
  }
}
