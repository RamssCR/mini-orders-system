import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '#common/modules/database.module';
import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [OrdersModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
