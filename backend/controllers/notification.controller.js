const Notification = require('../models/Notification.model');

// GET /api/notifications — get user's notifications
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(20);
    const unreadCount = await Notification.countDocuments({ userId: req.user.id, read: false });
    res.json({ notifications, unreadCount });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des notifications.', detail: err.message });
  }
};

// PATCH /api/notifications/read-all — mark all as read
const markAllRead = async (req, res) => {
  try {
    await Notification.updateMany({ userId: req.user.id, read: false }, { read: true });
    res.json({ message: 'Toutes les notifications ont été marquées comme lues.' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur.', detail: err.message });
  }
};

// PATCH /api/notifications/:id/read — mark one as read
const markOneRead = async (req, res) => {
  try {
    await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { read: true }
    );
    res.json({ message: 'Notification marquée comme lue.' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur.', detail: err.message });
  }
};

// Helper: create a notification (used internally by other controllers)
const createNotification = async (userId, type, title, message, link = '') => {
  try {
    await Notification.create({ userId, type, title, message, link });
  } catch (err) {
    console.error('Failed to create notification:', err.message);
  }
};

module.exports = { getNotifications, markAllRead, markOneRead, createNotification };
