import { Schema } from 'mongoose';

export const MommySchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, index: true, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    cpf: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    phone: { type: String, unique: true },
    city: { type: String },
    state: { type: String },
    isSeller: { type: Boolean, default: false },
    sellerId: { type: Schema.Types.ObjectId, ref: 'Seller' },
  },
  { timestamps: true },
);
