import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class MommyRepository {
  constructor(
    @InjectModel('Mommy') private model: Model<any>,
  ) {}

  async findById(id: string) {
    return this.model.findById(new Types.ObjectId(id)).lean().exec();
  }

  async findByEmail(email: string) {
    return this.model.findOne({ email }).lean().exec();
  }

  async findByCpf(cpf: string) {
    return this.model.findOne({ cpf }).lean().exec();
  }

  async findByUsername(username: string) {
    return this.model.findOne({ username: username.toLowerCase() }).lean().exec();
  }

  async create(data: any) {
    return this.model.create(data);
  }

  async update(id: string, data: any) {
    return this.model
      .findByIdAndUpdate(new Types.ObjectId(id), { $set: data }, { new: true })
      .lean()
      .exec();
  }
}
