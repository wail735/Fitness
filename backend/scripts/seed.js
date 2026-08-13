const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User.model');
const Class = require('../models/Class.model');
const { CoachRoutine } = require('../models/misc.models');

const seedData = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes('VOTRE_USER')) {
    console.error('❌ MONGODB_URI invalide dans .env.');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('✅ Connecté à MongoDB Atlas pour le seed.');

    // 1. Seed classes
    const classCount = await Class.countDocuments();
    if (classCount === 0) {
      const classes = [
        { name: 'Fitness & Cardio',      time: '09:00 - 10:00', day: 'Lundi',    trainer: 'Alex Rivera',   capacity: 15, category: 'Cardio'    },
        { name: 'Bodybuilding',           time: '10:30 - 12:00', day: 'Lundi',    trainer: 'Marc Vasseur',  capacity: 12, category: 'Force'      },
        { name: 'Yoga & Flexibilité',     time: '17:00 - 18:00', day: 'Mardi',    trainer: 'Sarah Jenkins', capacity: 20, category: 'Bien-être'  },
        { name: 'CrossFit Intense',       time: '18:30 - 19:30', day: 'Mercredi', trainer: 'David Chen',    capacity: 10, category: 'Intensif'   },
        { name: 'Boxing Conditioning',    time: '19:00 - 20:15', day: 'Jeudi',    trainer: 'Alex Rivera',   capacity: 14, category: 'Combat'     },
        { name: 'Pilates Soft',           time: '10:00 - 11:00', day: 'Vendredi', trainer: 'Sarah Jenkins', capacity: 15, category: 'Bien-être'  },
      ];
      await Class.insertMany(classes);
      console.log('✅ Seeded initial classes.');
    }

    // 2. Seed admin & coach accounts
    const adminExists = await User.findOne({ email: 'admin@fitness-club.com' });
    if (!adminExists) {
      await User.create({ name: 'Administrateur Principal', email: 'admin@fitness-club.com', password: 'admin1234', role: 'admin' });
      await User.create({ 
        name: 'Coach Alex Rivera', 
        email: 'coach@fitness-club.com', 
        password: 'coach1234', 
        role: 'coach',
        specialty: 'CrossFit & HIIT',
        bio: 'Certifié CrossFit Level 3, plus de 8 ans d\'expérience en coaching sportif. Spécialisé dans la transformation physique et la préparation athlétique.',
        workingDays: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
        workingHours: { start: '08:00', end: '17:00' }
      });
      console.log('✅ Seeded admin & coach accounts.');
      console.log('   → Admin:  admin@fitness-club.com  / admin1234');
      console.log('   → Coach:  coach@fitness-club.com  / coach1234');
    }

    // 3. Seed routines
    const routineCount = await CoachRoutine.countDocuments();
    if (routineCount === 0) {
      await CoachRoutine.create([
        { title: 'Programme Prise de Masse 4 Jours', target: 'Intermédiaire', exercisesCount: 12 },
        { title: 'Sèche & Définition Musculaire', target: 'Avancé', exercisesCount: 15 }
      ]);
      console.log('✅ Seeded default coach routines.');
    }

    console.log('\n🎉 Seed complet avec succès !');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erreur lors du seed :', err.message);
    process.exit(1);
  }
};

seedData();
