import { ClientsModule, Transport } from '@nestjs/microservices';
import { TCP_HOST, TCP_NAME, TCP_PORT } from '#config/environment';
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
        name: TCP_NAME,
        transport: Transport.TCP,
        options: {
          host: TCP_HOST,
          port: TCP_PORT,
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
