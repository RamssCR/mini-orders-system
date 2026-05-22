import { IsOptional, IsUUID, IsEnum } from 'class-validator';
import { ORDER_STATUS, type Status } from '#orders/entities/order.entity';
import { PaginationDto } from '#common/dtos/pagination.dto';

export class OrdersQueryDto extends PaginationDto {
  @IsUUID()
  @IsOptional()
  userId: string;

  @IsOptional()
  @IsEnum(ORDER_STATUS)
  status: Status;
}
