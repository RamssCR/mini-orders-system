import { Column, Entity } from 'typeorm';
import { BaseEntity } from '#common/entities/base.entity';

@Entity('products')
export class Product extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column()
  stock: number;
}
