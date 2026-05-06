import mongoose from 'mongoose';

const enterpriseSchema = new mongoose.Schema({
  configId: { type: String, required: true, default: 'main', unique: true },
  scannerName: { type: String, default: 'LODARK AC' },
  primaryColor: { type: String, default: '#2563eb' },
  spinnerColor1: { type: String, default: '#ff3366' },
  spinnerColor2: { type: String, default: '#ffaa00' },
  spinnerColor3: { type: String, default: '#33ccff' },
  downloadLink: { type: String, default: 'https://github.com/SamucaX12/zenith-scanner-site/raw/main/Lodark%20AC.exe' },
  customStrings: { type: [String], default: [] },
  privateStrings: { type: [String], default: [] },
  yaraRules: { type: String, default: '' },
  statusMessages: {
    type: [String],
    default: [
      "Iniciando varredura...",
      "Checando serviços do sistema...",
      "Verificando emuladores e W.O...",
      "Analisando hooks do Sysmon...",
      "Inspecionando histórico PowerShell...",
      "Escaneando arquivos suspeitos (BAM)...",
      "Verificando Blacklist...",
      "Lendo memória dos processos...",
      "Finalizando e enviando resultados..."
    ],
  },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Enterprise || mongoose.model('Enterprise', enterpriseSchema);
