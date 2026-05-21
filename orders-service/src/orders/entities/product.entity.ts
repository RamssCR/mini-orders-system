import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '#common/entities/base.entity';
import { Order } from './order.entity';

@Entity('products')
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column()
  stock: number;

  @ManyToMany(() => Order, (order) => order.products)
  orders: Order[];
}
