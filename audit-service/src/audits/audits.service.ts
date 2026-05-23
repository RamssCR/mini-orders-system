import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Audit } from './entities/audit.entity';
import { Model } from 'mongoose';
import { CreateAuditDto } from './dtos/create-audit.dto';

@Injectable()
export class AuditsService {
  constructor(
    @InjectModel(Audit.name)
    private readonly auditModel: Model<Audit>,
  ) {}

  findOrderAudits(orderId: string): Promise<Audit[]> {
    return this.auditModel
      .find({ orderId })
      .select('-__v')
      .lean()
      .sort('-createdAt')
      .exec();
  }

  async create(payload: CreateAuditDto): Promise<void> {
    await this.auditModel.create(payload);
  }
}
