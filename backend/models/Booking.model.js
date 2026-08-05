const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User',  required: true },
  classId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
}, { timestamps: true });

// Prevent duplicate bookings
bookingSchema.index({ userId: 1, classId: 1 }, { unique: true });

module.exports = mongoose.model('Booking', bookingSchema);
