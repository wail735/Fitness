const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('VOTRE_USER')) {
    console.error('\n❌ MONGODB_URI non configurée dans le fichier .env !');
    console.error('   → Ouvrez backend/.env et remplacez la valeur MONGODB_URI');
    console.error('   → Format : mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/fitness_db\n');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('✅ Connecté à MongoDB Atlas');
  } catch (err) {
    console.error('❌ Impossible de se connecter à MongoDB Atlas :', err.message);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB déconnecté. Tentative de reconnexion...');
});

module.exports = connectDB;
