import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed
  email: { type: String, required: false },
  adminKey: { type: String, required: true }, // A key que usou para registrar
  plan: { type: String, required: true, enum: ['Mensal', 'Enterprise', 'Privado', 'superadmin'] },
  game: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'screenshare', 'superadmin'], default: 'user' },
  ownerKey: { type: String, required: true }, // Para saber de quem é o time
  lastIp: { type: String, default: '' },
  lastActive: { type: Date, default: Date.now }, // Para detectar se está online
  twoFactorEnabled: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
