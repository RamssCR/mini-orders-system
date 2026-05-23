import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsUUID,
} from 'class-validator';

export const ORDER_STATUS = [
  'pending',
  'paid',
  'completed',
  'cancelled',
] as const;
export type Status = (typeof ORDER_STATUS)[number];

export class CreateAuditDto {
  @IsUUID()
  @IsNotEmpty()
  orderId: string;

  @IsEnum(ORDER_STATUS)
  @IsNotEmpty()
  fromStatus: Status;

  @IsEnum(ORDER_STATUS)
  @IsNotEmpty()
  toStatus: Status;

  @IsDateString()
  @IsNotEmpty()
  timestamp: Date;

  @IsObject()
  @IsNotEmpty()
  metadata: Record<string, unknown>;
}
