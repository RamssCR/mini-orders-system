import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { ORDER_STATUS, type Status } from '#orders/entities/order.entity';

export class ChangeStatusDto {
  @IsEnum(ORDER_STATUS)
  @IsNotEmpty()
  status: Status;

  @IsUUID()
  @IsNotEmpty()
  id: string;
}
