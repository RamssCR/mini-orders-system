import {
  AUDIT_SERVICE_HOST,
  AUDIT_SERVICE_PORT,
  AUDIT_SERVICE_PROXY,
} from '#config/environment';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { AuditsController } from './audits.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUDIT_SERVICE_PROXY,
        transport: Transport.TCP,
        options: {
          host: AUDIT_SERVICE_HOST,
          port: AUDIT_SERVICE_PORT,
        },
      },
    ]),
  ],
  controllers: [AuditsController],
})
export class AuditsModule {}
