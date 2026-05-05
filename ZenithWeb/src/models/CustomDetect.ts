import mongoose from 'mongoose';

const CustomDetectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: String, default: '' },
  md5: { type: String, default: '' },
  sha256: { type: String, default: '' },
  dps: { type: String, default: '' },
  pcaSvc: { type: String, default: '' },
  downloadLink: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  addedBy: { type: String, default: 'Lodark' }
}, { timestamps: true });

export default mongoose.models.CustomDetect || mongoose.model('CustomDetect', CustomDetectSchema);