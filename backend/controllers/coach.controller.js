const { CoachRoutine } = require('../models/misc.models');

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

module.exports = { getRoutines, createRoutine, deleteRoutine };
