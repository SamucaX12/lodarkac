
const mongoose = require('mongoose');

const uri = "mongodb+srv://samucazada:samuca244@cluster0.tgqmq2g.mongodb.net/zenith?retryWrites=true&w=majority&appName=Cluster0";

const statusMessages = [
  "Iniciando telagem...",
  "Procurando bypass mal feito...",
  "Checando emulador genérico...",
  "Analisando PowerShell suspeito...",
  "Vendo tentativa de limpar rastro...",
  "Lendo Prefetch que o bypass esqueceu...",
  "Pegando processo escondido...",
  "Scanner LodarkAC ativado...",
  "Bypass detectado \uD83D\uDC80",
  "Relatório enviado para LodarkAC.",
  "GG."
];

async function updateConfig() {
    try {
        await mongoose.connect(uri);
        console.log("Conectado ao MongoDB!");
        
        const db = mongoose.connection.db;
        const enterpriseCollection = db.collection('enterprises');
        
        const result = await enterpriseCollection.updateOne(
            { configId: 'main' },
            { 
                $set: { 
                    statusMessages: statusMessages,
                    updatedAt: new Date()
                } 
            },
            { upsert: true }
        );
        
        console.log("Configuração atualizada com sucesso!");
        console.log(result);
        
    } catch (e) {
        console.error("Erro:", e);
    } finally {
        await mongoose.disconnect();
    }
}

updateConfig();
