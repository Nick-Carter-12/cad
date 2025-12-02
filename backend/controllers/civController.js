// Civilians can create calls for service.
const { calls, nextId } = require('../models/dataStore');

function createCall(req, res) {
  const { type, description, location } = req.body;
  if (!type || !description) {
    return res.status(400).json({ error: 'type and description are required' });
  }

  const call = {
    id: nextId(),
    type,
    description,
    location: location || 'Unknown',
    createdBy: req.user.username,
    status: 'Pending',
    assignedUnit: null,
    assignedUnitId: null,
    assignedUnitNumber: null,
    assignedUnitOwner: null,
    notes: [],
  };
  calls.push(call);
  res.status(201).json(call);
}

function myCalls(req, res) {
  const mine = calls
    .filter((c) => c.createdBy === req.user.username)
    .map((call) => ({
      ...call,
      notes: call.notes.filter((note) => ['public', 'civ-private'].includes(note.visibility)),
    }));
  res.json(mine);
}

function addNote(req, res) {
  const { id } = req.params;
  const { text, visibility = 'public' } = req.body;
  const call = calls.find((c) => c.id === id && c.createdBy === req.user.username);
  if (!call) {
    return res.status(404).json({ error: 'Call not found' });
  }
  if (!text) {
    return res.status(400).json({ error: 'Note text is required' });
  }
  const allowedVisibilities = ['public', 'civ-private'];
  if (!allowedVisibilities.includes(visibility)) {
    return res.status(400).json({ error: 'Invalid visibility for civilian note' });
  }

  call.notes = call.notes || [];

  const note = {
    id: nextId(),
    text,
    author: req.user.username,
    role: 'civ',
    visibility,
    createdAt: new Date().toISOString(),
  };
  call.notes.push(note);
  res.status(201).json(note);
}

module.exports = { createCall, myCalls, addNote };
