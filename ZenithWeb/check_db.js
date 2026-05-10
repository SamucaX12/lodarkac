const mongoose = require('mongoose');

const uri = "mongodb+srv://samucazada:samuca244@cluster0.tgqmq2g.mongodb.net/zenith?retryWrites=true&w=majority&appName=Cluster0";

async function checkDb() {
    try {
        await mongoose.connect(uri);
        console.log("Conectado ao MongoDB!");
        
        const db = mongoose.connection.db;
        const resultsCollection = db.collection('results');
        
        const count = await resultsCollection.countDocuments();
        console.log(`Total de resultados no banco: ${count}`);
        
        const latest = await resultsCollection.find().sort({ createdAt: -1 }).limit(1).toArray();
        if (latest.length > 0) {
            console.log("Último resultado inserido:");
            console.log(`PIN: ${latest[0].pin}`);
            console.log(`Data: ${latest[0].createdAt}`);
            console.log(`Usuário: ${latest[0].systemInfo?.username}`);
        } else {
            console.log("Nenhum resultado encontrado na coleção.");
        }
        
    } catch (e) {
        console.error("Erro:", e);
    } finally {
        await mongoose.disconnect();
    }
}

checkDb();
