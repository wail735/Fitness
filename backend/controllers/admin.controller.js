const User = require('../models/User.model');
const Class = require('../models/Class.model');
const Booking = require('../models/Booking.model');
const Workout = require('../models/Workout.model');

// GET /api/admin/stats
const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalClasses = await Class.countDocuments();
    const totalBookings = await Booking.countDocuments();

    // Aggregate capacity
    const capacityResult = await Class.aggregate([
      { $group: { _id: null, totalCapacity: { $sum: '$capacity' } } }
    ]);
    const totalCapacity = capacityResult.length > 0 ? capacityResult[0].totalCapacity : 0;

    const occupancyRate = totalCapacity > 0
      ? Math.round((totalBookings / totalCapacity) * 100)
      : 0;

    // Aggregate classes popularity
    const classesWithBookings = await Class.aggregate([
      {
        $lookup: {
          from: 'bookings',
          localField: '_id',
          foreignField: 'classId',
          as: 'bookingsData'
        }
      },
      {
        $project: {
          name: 1,
          capacity: 1,
          booked: { $size: '$bookingsData' }
        }
      },
      { $sort: { booked: -1 } }
    ]);

    // Aggregate user growth by month
    const userGrowthResult = await User.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    // Format for frontend
    let cumulativeUsers = 0;
    const userGrowth = userGrowthResult.map(item => {
      cumulativeUsers += item.count;
      const [year, month] = item._id.split('-');
      const monthNames = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
      return {
        month: monthNames[parseInt(month) - 1],
        users: cumulativeUsers
      };
    });

    res.json({
      totalUsers,
      totalClasses,
      totalBookings,
      occupancyRate,
      monthlyRevenue: totalUsers * 50,
      classesPopularity: classesWithBookings,
      userGrowth
    });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des statistiques.', detail: err.message });
  }
};

// GET /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: 'bookings',
          localField: '_id',
          foreignField: 'userId',
          as: 'bookings'
        }
      },
      {
        $lookup: {
          from: 'workouts',
          localField: '_id',
          foreignField: 'userId',
          as: 'workouts'
        }
      },
      {
        $project: {
          id: '$_id',
          name: 1,
          email: 1,
          role: 1,
          createdAt: 1,
          bookingsCount: { $size: '$bookings' },
          workoutsCount: { $size: '$workouts' }
        }
      },
      { $sort: { createdAt: -1 } }
    ]);

    // Map `_id` to `id` string for the frontend (the aggregation keeps _id as ObjectId)
    const formattedUsers = users.map(u => ({
      ...u,
      id: u.id.toString()
    }));

    res.json(formattedUsers);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.', detail: err.message });
  }
};

// PATCH /api/admin/users/:id/role
const updateUserRole = async (req, res) => {
  const { role } = req.body;
  if (!['user', 'coach', 'admin'].includes(role))
    return res.status(400).json({ error: 'Rôle invalide. Doit être user, coach ou admin.' });

  if (req.params.id === req.user.id) {
    return res.status(403).json({ error: 'Action interdite : vous ne pouvez pas modifier votre propre rôle.' });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, select: 'name email role' }
    );
    if (!user) return res.status(404).json({ error: 'Utilisateur introuvable.' });
    
    // For consistency with frontend expecting `id`
    res.json({ id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du rôle.', detail: err.message });
  }
};

module.exports = { getStats, getAllUsers, updateUserRole };
