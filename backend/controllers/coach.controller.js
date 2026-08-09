const { CoachRoutine } = require('../models/misc.models');
const User = require('../models/User.model');
const Workout = require('../models/Workout.model');
const Booking = require('../models/Booking.model');

// GET /api/coach/routines
const getRoutines = async (req, res) => {
  try {
    const routines = await CoachRoutine.find().sort({ createdAt: -1 });
    res.json(routines);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des routines.', detail: err.message });
  }
};

// POST /api/coach/routines
const createRoutine = async (req, res) => {
  const { title, target, exercisesCount } = req.body;
  if (!title) return res.status(400).json({ error: 'Le titre est requis.' });

  try {
    const routine = await CoachRoutine.create({
      title,
      target: target || 'Intermédiaire',
      exercisesCount: Number(exercisesCount) || 0
    });
    res.status(201).json(routine);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la création du programme.', detail: err.message });
  }
};

// DELETE /api/coach/routines/:id
const deleteRoutine = async (req, res) => {
  try {
    await CoachRoutine.findByIdAndDelete(req.params.id);
    res.json({ message: 'Programme supprimé.' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression.', detail: err.message });
  }
};

// GET /api/coach/members  — liste des vrais membres inscrits
const getMembers = async (req, res) => {
  try {
    const members = await User.aggregate([
      { $match: { role: 'user' } },
      {
        $lookup: {
          from: 'workouts',
          localField: '_id',
          foreignField: 'userId',
          as: 'workouts'
        }
      },
      {
        $lookup: {
          from: 'bookings',
          localField: '_id',
          foreignField: 'userId',
          as: 'bookings'
        }
      },
      {
        $project: {
          name: 1,
          email: 1,
          createdAt: 1,
          workoutsCount: { $size: '$workouts' },
          bookingsCount: { $size: '$bookings' },
          lastWorkout: { $max: '$workouts.date' }
        }
      },
      { $sort: { createdAt: -1 } }
    ]);

    res.json(members);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des membres.', detail: err.message });
  }
};

// GET /api/coach/stats  — stats du dashboard coach
const getCoachStats = async (req, res) => {
  try {
    const totalMembers = await User.countDocuments({ role: 'user' });
    const totalRoutines = await CoachRoutine.countDocuments();
    const totalBookings = await Booking.countDocuments();

    res.json({ totalMembers, totalRoutines, totalBookings });
  } catch (err) {
    res.status(500).json({ error: 'Erreur stats coach.', detail: err.message });
  }
};

module.exports = { getRoutines, createRoutine, deleteRoutine, getMembers, getCoachStats };
