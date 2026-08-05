const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./lib/db');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Connect to MongoDB ───────────────────────────────────────────────────────
connectDB();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true,
}));
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth',    require('./routes/auth.routes'));
app.use('/api/classes', require('./routes/class.routes'));
app.use('/api/users',   require('./routes/user.routes'));
app.use('/api/admin',   require('./routes/admin.routes'));
app.use('/api/coach',   require('./routes/coach.routes'));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: '🏋️ Fitness API is running!', timestamp: new Date().toISOString() });
});

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ─── Error Handler ───────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Fitness API Server`);
  console.log(`   → Running on:  http://localhost:${PORT}`);
  console.log(`   → Health:      http://localhost:${PORT}/api/health`);
  console.log(`   → Env:         ${process.env.NODE_ENV || 'development'}\n`);
});
