import mongoose from 'mongoose';

const CustomStringSchema = new mongoose.Schema({
  ownerId: {
    type: String, // ID do Enterprise que criou (ou 'global' para strings padrões)
    required: true,
    index: true,
  },
  process: {
    type: String, // ex: 'dps', 'lsass', 'svchost', 'explorer'
    required: true,
  },
  clientName: {
    type: String, // Nome amigável (ex: 'Mesa Changer', 'Generic HWID')
    required: true,
  },
  stringValue: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    enum: ['Suspeito', 'Cheating'],
    default: 'Suspeito',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Índice composto para busca rápida no scanner
CustomStringSchema.index({ process: 1, stringValue: 1 });

export default mongoose.models.CustomString || mongoose.model('CustomString', CustomStringSchema);
