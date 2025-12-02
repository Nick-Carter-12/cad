const express = require('express');
const { myCalls, updateOfficerStatus } = require('../controllers/policeController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// GET /police/calls
router.get('/calls', requireAuth('police'), myCalls);

// PATCH /police/calls/:id/status
router.patch('/calls/:id/status', requireAuth('police'), updateOfficerStatus);

module.exports = router;
