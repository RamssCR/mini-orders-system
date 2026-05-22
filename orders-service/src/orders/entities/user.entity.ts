import { BaseEntity } from '#common/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Order } from './order.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  documentId: string;

  @Column()
  phone: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
