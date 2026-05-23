import { Controller } from '@nestjs/common';
import { AuditsService } from './audits.service';

@Controller()
export class AuditsController {
  constructor(private readonly auditsService: AuditsService) {}
}
