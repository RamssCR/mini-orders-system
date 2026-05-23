import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuditsModule } from './audits/audits.module';
import { BrokersModule } from '#common/modules/brokers.module';
import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { PipesModule } from '#common/pipes/pipes.module';
import { ThrottlerModule } from '#common/modules/throttler.module';

@Module({
  imports: [
    AuditsModule,
    BrokersModule,
    OrdersModule,
    PipesModule,
    ThrottlerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
