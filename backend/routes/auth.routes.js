const router = require('express').Router();
const { register, login, getMe } = require('../controllers/auth.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getMe);

module.exports = router;
