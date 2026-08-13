const router = require('express').Router();
const { authMiddleware, adminMiddleware, userMiddleware } = require('../middleware/auth.middleware');
const {
  getClasses, createClass, deleteClass,
  bookClass, cancelBooking, getMyBookings,
} = require('../controllers/class.controller');

router.get('/',                    getClasses);
router.post('/',                   authMiddleware, adminMiddleware, createClass);
router.delete('/:id',              authMiddleware, adminMiddleware, deleteClass);
router.get('/my-bookings',         authMiddleware, userMiddleware, getMyBookings);
router.post('/:id/book',           authMiddleware, userMiddleware, bookClass);
router.delete('/:id/book',         authMiddleware, userMiddleware, cancelBooking);

module.exports = router;
