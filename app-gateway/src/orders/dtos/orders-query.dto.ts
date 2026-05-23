import { IsOptional, IsUUID, IsEnum } from 'class-validator';
import { PaginationDto } from '#common/dtos/pagination.dto';
import { ORDER_STATUS, type Status } from './order-status';

export class OrdersQueryDto extends PaginationDto {
  @IsUUID()
  @IsOptional()
  userId: string;

  @IsOptional()
  @IsEnum(ORDER_STATUS)
  status: Status;
}
