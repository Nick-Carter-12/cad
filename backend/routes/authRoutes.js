const express = require('express');
const { login, logout } = require('../controllers/authController');

const router = express.Router();

// POST /auth/login
router.post('/login', login);

// POST /auth/logout
router.post('/logout', logout);

module.exports = router;
