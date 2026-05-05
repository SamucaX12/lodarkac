import mongoose from 'mongoose';

const pinSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  ownerKey: { type: String, required: true, default: 'samuca244' }, // A key do admin que gerou
  createdBy: { type: String, required: true, default: 'Samuca' }, // Username de quem gerou
  clientName: { type: String, required: true, default: 'Unknown' },
  game: { type: String, required: true, enum: ['Free Fire', 'FiveM'], default: 'Free Fire' },
  type: { type: String, required: true, enum: ['Standard', 'Enterprise', 'Private'] },
  isActive: { type: Boolean, default: true },
  isScanning: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Pin || mongoose.model('Pin', pinSchema);
