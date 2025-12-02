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
  };
  calls.push(call);
  res.status(201).json(call);
}

module.exports = { createCall };
