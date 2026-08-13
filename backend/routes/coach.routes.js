const router = require('express').Router();
const { authMiddleware, coachOrAdminMiddleware } = require('../middleware/auth.middleware');
const { 
  getRoutines, createRoutine, deleteRoutine, 
  getMembers, getCoachStats,
  getCoachSessions, updateCoachSession 
} = require('../controllers/coach.controller');

router.use(authMiddleware);
router.use(coachOrAdminMiddleware);

router.get('/routines',        getRoutines);
router.post('/routines',       createRoutine);
router.delete('/routines/:id', deleteRoutine);
router.get('/members',         getMembers);
router.get('/stats',           getCoachStats);
router.get('/sessions',        getCoachSessions);
router.patch('/sessions/:sessionId', updateCoachSession);

module.exports = router;
