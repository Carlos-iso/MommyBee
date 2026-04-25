import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StoreDocument = Store & Document;

@Schema({ timestamps: true })
export class Store {
  @Prop({ required: true, ref: 'Seller' })
  sellerId: string;

  @Prop({ required: true })
  storeName: string;

  @Prop()
  storeDescription?: string;

  @Prop()
  profileImage?: string;

  @Prop()
  bannerImage?: string;

  @Prop()
  address?: string;

  @Prop()
  city?: string;

  @Prop()
  state?: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  totalSales: number;

  @Prop({ default: 0 })
  totalRevenue: number;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
