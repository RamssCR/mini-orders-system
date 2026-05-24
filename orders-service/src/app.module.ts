import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '#common/modules/database.module';
import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { PipesModule } from '#common/pipes/pipes.module';

@Module({
  imports: [OrdersModule, DatabaseModule, PipesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
