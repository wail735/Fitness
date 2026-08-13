const router = require('express').Router();
const { authMiddleware } = require('../middleware/auth.middleware');
const { getNotifications, markAllRead, markOneRead } = require('../controllers/notification.controller');

router.use(authMiddleware);

router.get('/', getNotifications);
router.patch('/read-all', markAllRead);
router.patch('/:id/read', markOneRead);

module.exports = router;
