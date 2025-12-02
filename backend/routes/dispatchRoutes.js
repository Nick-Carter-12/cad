const express = require('express');
const {
  listCalls,
  listUnits,
  addUnit,
  assignUnit,
  updateStatus,
} = require('../controllers/dispatchController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// GET /dispatch/calls
router.get('/calls', requireAuth('dispatch'), listCalls);

// Units
router.get('/units', requireAuth('dispatch'), listUnits);
router.post('/units', requireAuth('dispatch'), addUnit);

// PATCH /dispatch/calls/:id/assign
router.patch('/calls/:id/assign', requireAuth('dispatch'), assignUnit);

// PATCH /dispatch/calls/:id/status
router.patch('/calls/:id/status', requireAuth('dispatch'), updateStatus);

module.exports = router;
