import { Schema } from 'mongoose';

export type SellerStatus = 'pending' | 'approved' | 'rejected';

export const SellerSchema = new Schema(
  {
    mommyId: { type: Schema.Types.ObjectId, ref: 'Mommy', required: true, unique: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    storeName: { type: String, required: true },
    storeDescription: { type: String },
    cnpj: { type: String },
    phone: { type: String },
    city: { type: String },
    state: { type: String },
    address: { type: String },
    category: { type: String },
    banner: { type: String },
    avatar: { type: String },
    rating: { type: Number, default: 0 },
    totalSales: { type: Number, default: 0 },
    productsCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

SellerSchema.index({ storeName: 'text', category: 'text' });
