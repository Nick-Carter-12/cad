const express = require('express');
const { listCalls, assignUnit, updateStatus } = require('../controllers/dispatchController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// GET /dispatch/calls
router.get('/calls', requireAuth('dispatch'), listCalls);

// PATCH /dispatch/calls/:id/assign
router.patch('/calls/:id/assign', requireAuth('dispatch'), assignUnit);

// PATCH /dispatch/calls/:id/status
router.patch('/calls/:id/status', requireAuth('dispatch'), updateStatus);

module.exports = router;
