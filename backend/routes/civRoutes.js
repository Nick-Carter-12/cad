const express = require('express');
const { createCall } = require('../controllers/civController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// POST /civ/calls
router.post('/calls', requireAuth('civ'), createCall);

module.exports = router;
