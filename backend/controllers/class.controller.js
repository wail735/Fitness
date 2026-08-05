const Class   = require('../models/Class.model');
const Booking = require('../models/Booking.model');

// GET /api/classes
const getClasses = async (req, res) => {
  try {
    const classes = await Class.find().sort({ createdAt: 1 });
    // For each class, count bookings
    const result = await Promise.all(
      classes.map(async (c) => {
        const booked = await Booking.countDocuments({ classId: c._id });
        return { ...c.toObject(), id: c._id, booked };
      })
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Impossible de récupérer les cours.', detail: err.message });
  }
};

// POST /api/classes (Admin only)
const createClass = async (req, res) => {
  const { name, time, day, trainer, capacity, category } = req.body;
  if (!name || !time || !day || !trainer || !capacity)
    return res.status(400).json({ error: 'Tous les champs (name, time, day, trainer, capacity) sont requis.' });

  try {
    const cls = await Class.create({ name, time, day, trainer, capacity: Number(capacity), category: category || 'Cardio' });
    res.status(201).json({ ...cls.toObject(), id: cls._id, booked: 0 });
  } catch (err) {
    res.status(500).json({ error: 'Impossible de créer le cours.', detail: err.message });
  }
};

// DELETE /api/classes/:id (Admin only)
const deleteClass = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    // Delete associated bookings
    await Booking.deleteMany({ classId: req.params.id });
    res.json({ message: `Cours ${req.params.id} supprimé avec succès.` });
  } catch (err) {
    res.status(404).json({ error: 'Cours introuvable.', detail: err.message });
  }
};

// POST /api/classes/:id/book
const bookClass = async (req, res) => {
  const classId = req.params.id;
  const userId  = req.user.id;

  try {
    const cls = await Class.findById(classId);
    if (!cls) return res.status(404).json({ error: 'Cours introuvable.' });

    const count = await Booking.countDocuments({ classId });
    if (count >= cls.capacity)
      return res.status(409).json({ error: 'Ce cours est complet.' });

    const booking = await Booking.create({ userId, classId });
    res.status(201).json({ message: 'Réservation confirmée !', bookingId: booking._id });
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ error: 'Vous êtes déjà inscrit à ce cours.' });
    res.status(500).json({ error: 'Impossible de réserver.', detail: err.message });
  }
};

// DELETE /api/classes/:id/book
const cancelBooking = async (req, res) => {
  try {
    await Booking.findOneAndDelete({ userId: req.user.id, classId: req.params.id });
    res.json({ message: 'Réservation annulée.' });
  } catch (err) {
    res.status(500).json({ error: 'Impossible d\'annuler la réservation.', detail: err.message });
  }
};

// GET /api/classes/my-bookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).select('classId -_id');
    res.json(bookings.map((b) => b.classId.toString()));
  } catch (err) {
    res.status(500).json({ error: 'Impossible de récupérer vos réservations.', detail: err.message });
  }
};

module.exports = { getClasses, createClass, deleteClass, bookClass, cancelBooking, getMyBookings };
