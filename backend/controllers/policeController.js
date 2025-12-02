// Officers can review their assigned calls and update status.
const { calls, units, createUnit, nextId } = require('../models/dataStore');

function myCalls(req, res) {
  const assigned = calls
    .filter((c) => c.assignedUnitOwner === req.user.username)
    .map((call) => ({
      ...call,
      notes: call.notes.filter((note) => ['public', 'officer-private'].includes(note.visibility)),
    }));
  res.json(assigned);
}

function updateOfficerStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  const call = calls.find(
    (c) => c.id === id && c.assignedUnitOwner === req.user.username,
  );
  if (!call) {
    return res.status(404).json({ error: 'Call not found for this officer' });
  }

  const allowed = ['En-Route', 'On-Scene', 'Clear'];
  if (status && !allowed.includes(status)) {
    return res.status(400).json({ error: 'Invalid status update' });
  }

  call.status = status || call.status;
  res.json(call);
}

function addNote(req, res) {
  const { id } = req.params;
  const { text, visibility = 'public' } = req.body;
  const call = calls.find((c) => c.id === id && c.assignedUnitOwner === req.user.username);
  if (!call) {
    return res.status(404).json({ error: 'Call not found for this officer' });
  }
  if (!text) {
    return res.status(400).json({ error: 'Note text is required' });
  }
  const allowedVisibilities = ['public', 'officer-private'];
  if (!allowedVisibilities.includes(visibility)) {
    return res.status(400).json({ error: 'Invalid visibility for officer note' });
  }

  call.notes = call.notes || [];

  const note = {
    id: nextId(),
    text,
    author: req.user.username,
    role: 'police',
    visibility,
    createdAt: new Date().toISOString(),
  };
  call.notes.push(note);
  res.status(201).json(note);
}

function myUnits(req, res) {
  const mine = units.filter((u) => u.owner === req.user.username);
  res.json(mine);
}

function createOfficerUnit(req, res) {
  const unit = createUnit(req.user.username, req.user.username);
  res.status(201).json(unit);
}

module.exports = { myCalls, updateOfficerStatus, addNote, myUnits, createOfficerUnit };
