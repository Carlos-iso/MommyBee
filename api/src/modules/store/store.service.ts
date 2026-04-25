import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Store, StoreDocument } from './schemas/store.schema';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name) private storeModel: Model<StoreDocument>,
  ) {}

  async create(
    sellerId: string,
    dto: {
      storeName: string;
      storeDescription?: string;
      profileImage?: string;
      bannerImage?: string;
      address?: string;
      city?: string;
      state?: string;
    },
  ) {
    const existing = await this.storeModel.findOne({ sellerId });
    if (existing) {
      throw new ConflictException('Loja já existe para este vendedor');
    }

    const store = await this.storeModel.create({
      sellerId,
      storeName: dto.storeName,
      storeDescription: dto.storeDescription,
      profileImage: dto.profileImage,
      bannerImage: dto.bannerImage,
      address: dto.address,
      city: dto.city,
      state: dto.state,
    });

    return store;
  }

  async findBySellerId(sellerId: string) {
    const store = await this.storeModel.findOne({ sellerId });
    if (!store) {
      throw new NotFoundException('Loja não encontrada');
    }
    return store;
  }

  async findById(storeId: string) {
    const store = await this.storeModel.findById(storeId);
    if (!store) {
      throw new NotFoundException('Loja não encontrada');
    }
    return store;
  }

  async update(
    sellerId: string,
    dto: Partial<{
      storeName: string;
      storeDescription: string;
      profileImage: string;
      bannerImage: string;
      address: string;
      city: string;
      state: string;
      isActive: boolean;
    }>,
  ) {
    const store = await this.storeModel.findOneAndUpdate({ sellerId }, dto, {
      new: true,
    });
    if (!store) {
      throw new NotFoundException('Loja não encontrada');
    }
    return store;
  }

  async getDashboard(sellerId: string) {
    const store = await this.storeModel.findOne({ sellerId });
    if (!store) {
      throw new NotFoundException('Loja não encontrada');
    }
    return {
      store,
      totalSales: store.totalSales,
      totalRevenue: store.totalRevenue,
    };
  }
}
