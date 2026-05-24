import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuditsModule } from './audits/audits.module';
import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { PipesModule } from '#common/pipes/pipes.module';
import { ThrottlerModule } from '#common/modules/throttler.module';
import { ExceptionsFilterModule } from '#common/filters/exceptions.filter';
import { InterceptorsModule } from '#common/interceptors/interceptors.module';

@Module({
  imports: [
    AuditsModule,
    ExceptionsFilterModule,
    InterceptorsModule,
    OrdersModule,
    PipesModule,
    ThrottlerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
