const router = require('express').Router();
const { authMiddleware, coachOrAdminMiddleware } = require('../middleware/auth.middleware');
const { getRoutines, createRoutine, deleteRoutine } = require('../controllers/coach.controller');

router.use(authMiddleware);
router.use(coachOrAdminMiddleware);

router.get('/routines',        getRoutines);
router.post('/routines',       createRoutine);
router.delete('/routines/:id', deleteRoutine);

module.exports = router;
