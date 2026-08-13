const router = require('express').Router();
const { authMiddleware, userMiddleware } = require('../middleware/auth.middleware');
const {
  getWorkouts, createWorkout, deleteWorkout,
  getBodyMetrics, createBodyMetric,
  getNutritionLogs, createNutritionLog,
  updateProfile, updatePassword,
  getCoaches, bookCoachSession,
} = require('../controllers/user.controller');

// Public routes
router.get('/coaches', getCoaches);

// All other user routes are protected
router.use(authMiddleware);

router.post('/coaches/:id/book',  userMiddleware, bookCoachSession);

router.put('/me/profile',         updateProfile);
router.put('/me/password',        updatePassword);

router.get('/me/workouts',        getWorkouts);
router.post('/me/workouts',       createWorkout);
router.delete('/me/workouts/:id', deleteWorkout);

router.get('/me/body-metrics',    getBodyMetrics);
router.post('/me/body-metrics',   createBodyMetric);

router.get('/me/nutrition',       getNutritionLogs);
router.post('/me/nutrition',      createNutritionLog);

module.exports = router;
