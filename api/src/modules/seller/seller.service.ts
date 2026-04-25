import { Injectable } from '@nestjs/common';
import { SellerRepository } from './seller.repository';

@Injectable()
export class SellerService {
  constructor(private repo: SellerRepository) {}

  async apply(mommyId: string, dto: any) {
    const existing = await this.repo.findByMommyId(mommyId);
    if (existing) return existing;

    const seller = await this.repo.create({
      mommyId,
      status: 'pending',
      ...dto,
    });
    return seller;
  }

  async getMySeller(mommyId: string) {
    return this.repo.findByMommyId(mommyId);
  }

  async getMyDashboard(sellerId: string) {
    const seller = await this.repo.findById(sellerId);
    if (!seller) return null;
    return {
      ...seller,
      stats: {
        totalSales: seller.totalSales,
        productsCount: seller.productsCount,
        rating: seller.rating,
      },
    };
  }

  async updateMyProfile(sellerId: string, dto: any) {
    return this.repo.update(sellerId, dto);
  }

  // Admin - gerenciar candidaturas
  async findAllPending() {
    return this.repo.findAll('pending');
  }

  async approve(sellerId: string) {
    return this.repo.updateStatus(sellerId, 'approved');
  }

  async reject(sellerId: string) {
    return this.repo.updateStatus(sellerId, 'rejected');
  }
}
