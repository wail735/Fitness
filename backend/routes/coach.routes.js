const router = require('express').Router();
const { authMiddleware, coachOrAdminMiddleware } = require('../middleware/auth.middleware');
const { getRoutines, createRoutine, deleteRoutine, getMembers, getCoachStats } = require('../controllers/coach.controller');

router.use(authMiddleware);
router.use(coachOrAdminMiddleware);

router.get('/routines',        getRoutines);
router.post('/routines',       createRoutine);
router.delete('/routines/:id', deleteRoutine);
router.get('/members',         getMembers);
router.get('/stats',           getCoachStats);

module.exports = router;
