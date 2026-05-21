import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '#common/entities/base.entity';
import { Product } from './product.entity';
import { User } from './user.entity';

export const ORDER_STATUS = ['pending', 'cancelled', 'completed'] as const;
export type Status = (typeof ORDER_STATUS)[number];

@Entity('orders')
export class Order extends BaseEntity {
  @Column()
  quantity: number;

  @Column({ type: 'enum', enum: ORDER_STATUS })
  status: Status;

  @ManyToMany(() => Product, (product) => product.orders)
  @JoinTable({
    name: 'order_products',
    joinColumn: { name: 'order_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  })
  products: Product[];

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
