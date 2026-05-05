import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  pin: { type: String, required: true, unique: true },
  ownerKey: { type: String, required: true, default: 'samuca244' }, // Quem gerou esse scan
  isClean: { type: Boolean, required: true },
  detections: { type: Array, default: [] },
  warnings: { type: Array, default: [] },
  integrity: { type: Array, default: [] },
  suspicious: { type: Array, default: [] },
  systemInfo: {
    os: { type: String, default: "Unknown" },
    hwid: { type: String, default: "Unknown" },
    username: { type: String, default: "Unknown" },
    pcName: { type: String, default: "Unknown" },
    steamId: { type: String, default: "Unknown" },
    ip: { type: String, default: "Unknown" },
    language: { type: String, default: "Portuguese (pt-BR)" }
  },
  discordInfo: {
    accounts: { type: Array, default: [] }
  },
  createdAt: { type: Date, default: Date.now, expires: 86400 } // TTL index: 24 horas (86400 segundos)
});

export default mongoose.models.Result || mongoose.model('Result', resultSchema);
