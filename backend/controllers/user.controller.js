const Workout  = require('../models/Workout.model');
const { BodyMetric, NutritionLog } = require('../models/misc.models');

// GET /api/users/me/workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des séances.', detail: err.message });
  }
};

// POST /api/users/me/workouts
const createWorkout = async (req, res) => {
  const { date, name, durationMinutes, caloriesBurned, exercises = [] } = req.body;
  if (!name || !date)
    return res.status(400).json({ error: 'Nom et date sont requis.' });

  try {
    const workout = await Workout.create({
      userId: req.user.id,
      date,
      name,
      durationMinutes: Number(durationMinutes) || 0,
      caloriesBurned: Number(caloriesBurned) || 0,
      exercises,
    });
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la création de la séance.', detail: err.message });
  }
};

// DELETE /api/users/me/workouts/:id
const deleteWorkout = async (req, res) => {
  try {
    await Workout.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: 'Séance supprimée.' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression.', detail: err.message });
  }
};

// GET /api/users/me/body-metrics
const getBodyMetrics = async (req, res) => {
  try {
    const metrics = await BodyMetric.find({ userId: req.user.id }).sort({ date: 1 });
    res.json(metrics);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des métriques.', detail: err.message });
  }
};

// POST /api/users/me/body-metrics
const createBodyMetric = async (req, res) => {
  const { date, weightKg, bodyFatPct, waistCm } = req.body;
  if (!date || !weightKg)
    return res.status(400).json({ error: 'Date et poids sont requis.' });

  try {
    const metric = await BodyMetric.create({
      userId: req.user.id,
      date,
      weightKg: Number(weightKg),
      bodyFatPct: Number(bodyFatPct) || 0,
      waistCm: Number(waistCm) || 0,
    });
    res.status(201).json(metric);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la mesure.', detail: err.message });
  }
};

// GET /api/users/me/nutrition
const getNutritionLogs = async (req, res) => {
  try {
    const logs = await NutritionLog.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des repas.', detail: err.message });
  }
};

// POST /api/users/me/nutrition
const createNutritionLog = async (req, res) => {
  const { date, meal, food, calories, protein, carbs, fat } = req.body;
  if (!date || !meal || !food)
    return res.status(400).json({ error: 'Date, repas et aliment sont requis.' });

  try {
    const log = await NutritionLog.create({
      userId: req.user.id,
      date,
      meal,
      food,
      calories: Number(calories) || 0,
      protein:  Number(protein)  || 0,
      carbs:    Number(carbs)    || 0,
      fat:      Number(fat)      || 0,
    });
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout du repas.', detail: err.message });
  }
};

module.exports = {
  getWorkouts, createWorkout, deleteWorkout,
  getBodyMetrics, createBodyMetric,
  getNutritionLogs, createNutritionLog,
};
