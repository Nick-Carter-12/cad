const express = require('express');
const { login, logout, me } = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// POST /auth/login
router.post('/login', login);

// GET /auth/me
router.get('/me', requireAuth(), me);

// POST /auth/logout
router.post('/logout', logout);

module.exports = router;
