const router = require('express').Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth.middleware');
const { getStats, getAllUsers, updateUserRole } = require('../controllers/admin.controller');

router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/stats',              getStats);
router.get('/users',              getAllUsers);
router.patch('/users/:id/role',   updateUserRole);

module.exports = router;
