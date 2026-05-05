import mongoose from 'mongoose';

const AdminKeySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  plan: {
    type: String,
    required: true,
    enum: ['Mensal', 'Enterprise', 'Privado'],
  },
  game: {
    type: String,
    required: true,
    enum: ['FF', 'FiveM', 'Valorant'],
  },
  ownerId: {
    type: String, // ID do comprador original (Team Owner)
    required: false,
  },
  maxSubKeys: {
    type: Number, // Quantas keys ele pode gerar para a equipe
    default: 0,
  },
  generatedSubKeys: {
    type: Number, // Quantas já gerou
    default: 0,
  },
  isSubKey: {
    type: Boolean, // Se é a key do dono (false) ou de um membro da equipe (true)
    default: false,
  },
  usedBy: {
    type: String, // Username de quem registrou essa key
    default: null,
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

export default mongoose.models.AdminKey || mongoose.model('AdminKey', AdminKeySchema);
