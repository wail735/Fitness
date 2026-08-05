const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  sets:     { type: Number, default: 0 },
  reps:     { type: Number, default: 0 },
  weightKg: { type: Number, default: 0 },
}, { _id: false });

const workoutSchema = new mongoose.Schema({
  userId:          { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date:            { type: String, required: true },
  name:            { type: String, required: true },
  durationMinutes: { type: Number, default: 0 },
  caloriesBurned:  { type: Number, default: 0 },
  exercises:       [exerciseSchema],
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);
