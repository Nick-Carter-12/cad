const express = require('express');
const { createCall, myCalls, addNote } = require('../controllers/civController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// POST /civ/calls
router.post('/calls', requireAuth('civ'), createCall);

// GET /civ/calls
router.get('/calls', requireAuth('civ'), myCalls);

// POST /civ/calls/:id/notes
router.post('/calls/:id/notes', requireAuth('civ'), addNote);

module.exports = router;
