import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '#common/entities/base.entity';
import { OrderItem } from './order-items.entity';
import { User } from './user.entity';

export const ORDER_STATUS = ['pending', 'cancelled', 'completed'] as const;
export type Status = (typeof ORDER_STATUS)[number];

@Entity('orders')
export class Order extends BaseEntity {
  @Column()
  quantity: number;

  @Column({ type: 'enum', enum: ORDER_STATUS, default: 'pending' })
  status: Status;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
