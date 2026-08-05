const router = require('express').Router();
const { authMiddleware } = require('../middleware/auth.middleware');
const {
  getWorkouts, createWorkout, deleteWorkout,
  getBodyMetrics, createBodyMetric,
  getNutritionLogs, createNutritionLog,
} = require('../controllers/user.controller');

// All user routes are protected
router.use(authMiddleware);

router.get('/me/workouts',        getWorkouts);
router.post('/me/workouts',       createWorkout);
router.delete('/me/workouts/:id', deleteWorkout);

router.get('/me/body-metrics',    getBodyMetrics);
router.post('/me/body-metrics',   createBodyMetric);

router.get('/me/nutrition',       getNutritionLogs);
router.post('/me/nutrition',      createNutritionLog);

module.exports = router;
