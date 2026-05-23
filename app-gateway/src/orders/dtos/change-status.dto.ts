import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { ORDER_STATUS, type Status } from './order-status';

export class ChangeStatusDto {
  @IsEnum(ORDER_STATUS)
  @IsNotEmpty()
  status: Status;

  @IsUUID()
  @IsNotEmpty()
  id: string;
}
