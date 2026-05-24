import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { Audit } from './entities/audit.entity';
import { AuditsService } from './audits.service';
import { Controller } from '@nestjs/common';
import { CreateAuditDto } from './dtos/create-audit.dto';

@Controller()
export class AuditsController {
  constructor(private readonly auditsService: AuditsService) {}

  @MessagePattern('order.audit.find_all')
  findOrderAudits(@Payload() orderId: string): Promise<Audit[]> {
    return this.auditsService.findOrderAudits(orderId);
  }

  @EventPattern('order.status_changed')
  handleOrderStatusChanged(@Payload() payload: CreateAuditDto): Promise<void> {
    return this.auditsService.create(payload);
  }
}
