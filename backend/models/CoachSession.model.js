const mongoose = require('mongoose');

const coachSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coachId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected', 'completed'], default: 'pending' },
  assignedRoutineId: { type: mongoose.Schema.Types.ObjectId, ref: 'CoachRoutine' },
  userNotes: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('CoachSession', coachSessionSchema);
