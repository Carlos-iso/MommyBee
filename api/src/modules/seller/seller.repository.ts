import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class SellerRepository {
  constructor(
    @InjectModel('Seller') private model: Model<any>,
  ) {}

  async findByMommyId(mommyId: string) {
    return this.model.findOne({ mommyId: new Types.ObjectId(mommyId) }).lean().exec();
  }

  async findById(id: string) {
    return this.model.findById(new Types.ObjectId(id)).lean().exec();
  }

  async create(data: any) {
    return this.model.create(data);
  }

  async updateStatus(id: string, status: string) {
    return this.model
      .findByIdAndUpdate(new Types.ObjectId(id), { $set: { status } }, { new: true })
      .lean()
      .exec();
  }

  async update(id: string, data: any) {
    return this.model
      .findByIdAndUpdate(new Types.ObjectId(id), { $set: data }, { new: true })
      .lean()
      .exec();
  }

  async findAll(status?: string) {
    const query = status ? { status } : {};
    return this.model.find(query).lean().exec();
  }
}
