import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '#common/entities/base.entity';
import { OrderItem } from './order-items.entity';
import { User } from './user.entity';

export const ORDER_STATUS = [
  'pending',
  'paid',
  'cancelled',
  'completed',
] as const;
export type Status = (typeof ORDER_STATUS)[number];

const getAllowedTransitions = (): Record<Status, Status[]> => {
  const [pending, paid, cancelled, completed] = ORDER_STATUS;

  return {
    [pending]: [paid, cancelled],
    [paid]: [cancelled],
    [completed]: [],
    [cancelled]: [],
  };
};

export const ALLOWED_TRANSITIONS = getAllowedTransitions();

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
