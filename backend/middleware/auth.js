// Authentication middleware to protect portal routes.
// Expects a token in the x-auth-token header and optional role requirement.
const { activeTokens } = require('../models/dataStore');

function requireAuth(requiredRole) {
  return (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token || !activeTokens.has(token)) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const session = activeTokens.get(token);
    const allowed =
      !requiredRole || session.role === requiredRole || session.role === 'admin';
    if (!allowed) {
      return res.status(403).json({ error: 'Forbidden for this portal' });
    }

    req.user = session;
    next();
  };
}

module.exports = { requireAuth };
