import mongoose from 'mongoose';

const UpdateSchema = new mongoose.Schema({
  version: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['major', 'minor', 'hotfix'], default: 'minor' },
  changes: [{
    type: { type: String, enum: ['added', 'improved', 'removed', 'fixed'], default: 'added' },
    text: { type: String, required: true }
  }],
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Update || mongoose.model('Update', UpdateSchema);
