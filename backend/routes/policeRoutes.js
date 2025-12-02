const express = require('express');
const {
  myCalls,
  updateOfficerStatus,
  addNote,
  myUnits,
  createOfficerUnit,
} = require('../controllers/policeController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// GET /police/calls
router.get('/calls', requireAuth('police'), myCalls);
router.post('/calls/:id/notes', requireAuth('police'), addNote);

// Units
router.get('/units', requireAuth('police'), myUnits);
router.post('/units', requireAuth('police'), createOfficerUnit);

// PATCH /police/calls/:id/status
router.patch('/calls/:id/status', requireAuth('police'), updateOfficerStatus);

module.exports = router;
