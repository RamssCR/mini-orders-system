import { DataSource } from 'typeorm';
import { Order } from '#orders/entities/order.entity';
import { OrderItem } from '#orders/entities/order-items.entity';
import { Product } from '#orders/entities/product.entity';
import { User } from '#orders/entities/user.entity';
import { join } from 'node:path';

if (process.env.NODE_ENV !== 'production') process.loadEnvFile();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [Order, Product, OrderItem, User],
  migrations: [join(__dirname, '..', '..', 'migrations', '*.{ts,js}')],
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
});
