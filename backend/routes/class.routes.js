const router = require('express').Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth.middleware');
const {
  getClasses, createClass, deleteClass,
  bookClass, cancelBooking, getMyBookings,
} = require('../controllers/class.controller');

router.get('/',                    getClasses);
router.post('/',                   authMiddleware, adminMiddleware, createClass);
router.delete('/:id',              authMiddleware, adminMiddleware, deleteClass);
router.get('/my-bookings',         authMiddleware, getMyBookings);
router.post('/:id/book',           authMiddleware, bookClass);
router.delete('/:id/book',         authMiddleware, cancelBooking);

module.exports = router;
