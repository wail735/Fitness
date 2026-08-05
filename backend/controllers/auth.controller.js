const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const signToken = (user) =>
  jwt.sign(
    { id: user._id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

// POST /api/auth/register
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: 'Nom, email et mot de passe sont requis.' });

  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ error: 'Un compte avec cet email existe déjà.' });

    const user = await User.create({ name, email, password });
    const token = signToken(user);

    res.status(201).json({
      message: 'Compte créé avec succès !',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur.', detail: err.message });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email et mot de passe sont requis.' });

  try {
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password))
      return res.status(401).json({ error: 'Email ou mot de passe invalide.' });

    const token = signToken(user);
    res.json({
      message: 'Connexion réussie !',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur.', detail: err.message });
  }
};

// GET /api/auth/me
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'Utilisateur introuvable.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur.', detail: err.message });
  }
};

module.exports = { register, login, getMe };
