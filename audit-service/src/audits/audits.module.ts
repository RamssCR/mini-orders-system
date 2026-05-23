import { Audit, AuditSchema } from './entities/audit.entity';
import { AuditsController } from './audits.controller';
import { AuditsService } from './audits.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Audit.name, schema: AuditSchema }]),
  ],
  controllers: [AuditsController],
  providers: [AuditsService],
})
export class AuditsModule {}
