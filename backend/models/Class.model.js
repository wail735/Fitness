const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  time:     { type: String, required: true },
  day:      { type: String, required: true },
  trainer:  { type: String, required: true },
  capacity: { type: Number, required: true, min: 1 },
  category: { type: String, default: 'Cardio', enum: ['Cardio', 'Force', 'Bien-être', 'Combat', 'Intensif'] },
}, { timestamps: true });

// Virtual field: bookings count (populated from Booking model)
classSchema.virtual('bookedCount', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'classId',
  count: true,
});

module.exports = mongoose.model('Class', classSchema);
