const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, role }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token.' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admin access required.' });
  }
  next();
};

const coachOrAdminMiddleware = (req, res, next) => {
  if (!req.user || !['coach', 'admin'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Forbidden: Coach or Admin access required.' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware, coachOrAdminMiddleware };
