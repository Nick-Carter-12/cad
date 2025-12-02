// Handles basic username/password authentication for all portals.
const { users, activeTokens } = require('../models/dataStore');

function login(req, res) {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = `${user.username}-${Date.now()}`;
  activeTokens.set(token, { username: user.username, role: user.role });
  res.json({ token, role: user.role });
}

function me(req, res) {
  res.json(req.user);
}

function logout(req, res) {
  const token = req.header('x-auth-token');
  if (token) {
    activeTokens.delete(token);
  }
  res.json({ success: true });
}

module.exports = { login, logout, me };
