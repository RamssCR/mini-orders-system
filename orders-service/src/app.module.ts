import {
  AUDIT_SERVICE_HOST,
  AUDIT_SERVICE_PORT,
  AUDIT_SERVICE_PROXY,
} from '#config/environment';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '#common/modules/database.module';
import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { PipesModule } from '#common/pipes/pipes.module';

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
    OrdersModule,
    DatabaseModule,
    PipesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
