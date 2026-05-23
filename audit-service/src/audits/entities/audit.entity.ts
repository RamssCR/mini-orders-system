import { ORDER_STATUS, type Status } from '#audits/dtos/create-audit.dto';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuditDocument = HydratedDocument<Audit>;

@Schema()
export class Audit {
  @Prop({ required: true, unique: true })
  orderId: string;

  @Prop({ required: true, enum: ORDER_STATUS })
  fromStatus: Status;

  @Prop({ required: true, enum: ORDER_STATUS })
  toStatus: Status;

  @Prop()
  timestamp: Date;

  @Prop(raw({ userId: String, quantity: Number }))
  metadata: Record<string, unknown>;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const AuditSchema = SchemaFactory.createForClass(Audit);
