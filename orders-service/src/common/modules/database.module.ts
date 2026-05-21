import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  NODE_ENV,
} from '#config/environment';
import { Module } from '@nestjs/common';
import { Order } from '#orders/entities/order.entity';
import { Product } from '#orders/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
      logging: NODE_ENV === 'development',
      entities: [Order, Product],
    }),
  ],
})
export class DatabaseModule {}
