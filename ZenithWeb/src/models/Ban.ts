import mongoose, { Schema, Document } from 'mongoose';

export interface IBan extends Document {
  target: string; // username or key
  type: 'username' | 'key';
  reason: string;
  ip?: string;
  bannedBy: string;
  createdAt: Date;
}

const BanSchema: Schema = new Schema({
  target: { type: String, required: true, index: true },
  type: { type: String, enum: ['username', 'key'], required: true },
  reason: { type: String, required: true },
  ip: { type: String },
  bannedBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Ban || mongoose.model<IBan>('Ban', BanSchema);
