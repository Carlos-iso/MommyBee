import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { SellerRepository } from './seller.repository';
import { SellerSchema } from './schemas/seller.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Seller', schema: SellerSchema }])],
  controllers: [SellerController],
  providers: [SellerService, SellerRepository],
})
export class SellerModule {}
