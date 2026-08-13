const mongoose = require('mongoose');

const bodyMetricSchema = new mongoose.Schema({
  userId:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date:         { type: String, required: true },
  weightKg:     { type: Number, required: true, min: 0 },
  bodyFatPct:   { type: Number, default: 0, min: 0 },
  waistCm:      { type: Number, default: 0, min: 0 },
  heartRate:    { type: Number, default: 0, min: 0 },
  hydrationPct: { type: Number, default: 0, min: 0 },
  bloodCellsUl: { type: Number, default: 0, min: 0 },
}, { timestamps: true });

const nutritionLogSchema = new mongoose.Schema({
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date:     { type: String, required: true },
  meal:     { type: String, required: true },
  food:     { type: String, required: true },
  calories: { type: Number, default: 0, min: 0 },
  protein:  { type: Number, default: 0, min: 0 },
  carbs:    { type: Number, default: 0, min: 0 },
  fat:      { type: Number, default: 0, min: 0 },
}, { timestamps: true });

const coachRoutineSchema = new mongoose.Schema({
  title:          { type: String, required: true },
  target:         { type: String, default: 'Intermédiaire' },
  exercisesCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = {
  BodyMetric:     mongoose.model('BodyMetric', bodyMetricSchema),
  NutritionLog:   mongoose.model('NutritionLog', nutritionLogSchema),
  CoachRoutine:   mongoose.model('CoachRoutine', coachRoutineSchema),
};
