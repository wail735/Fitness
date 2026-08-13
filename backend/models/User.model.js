const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  email:    { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true,
    match: [/.+\@.+\..+/, 'Veuillez renseigner une adresse email valide']
  },
  password: { type: String, required: true },
  role:     { type: String, enum: ['user', 'coach', 'admin'], default: 'user' },
  // Coach specific fields
  specialty:    { type: String, default: 'General Fitness' },
  bio:          { type: String, default: '' },
  avatar:       { type: String, default: '' },
  workingDays:  { type: [String], default: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'] },
  workingHours: { 
    start: { type: String, default: '09:00' }, 
    end: { type: String, default: '18:00' } 
  },
}, { timestamps: true });

// Hash password before save
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Method to check password
userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compareSync(candidate, this.password);
};

// Don't expose password in JSON responses
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

module.exports = mongoose.model('User', userSchema);
