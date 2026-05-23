import { Status } from '#orders/entities/order.entity';

export type CreateAudit = {
  orderId: string;
  fromStatus: Status;
  toStatus: Status;
  timestamp: Date;
  metadata: Record<string, unknown>;
};
