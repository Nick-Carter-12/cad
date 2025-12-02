// Dispatchers triage calls, assign units, and update call status.
const { calls } = require('../models/dataStore');

function listCalls(_req, res) {
  res.json(calls);
}

function assignUnit(req, res) {
  const { id } = req.params;
  const { unit } = req.body;
  const call = calls.find((c) => c.id === id);
  if (!call) {
    return res.status(404).json({ error: 'Call not found' });
  }

  call.assignedUnit = unit || 'Unspecified Unit';
  call.status = 'Dispatched';
  res.json(call);
}

function updateStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  const call = calls.find((c) => c.id === id);
  if (!call) {
    return res.status(404).json({ error: 'Call not found' });
  }

  call.status = status || call.status;
  res.json(call);
}

module.exports = { listCalls, assignUnit, updateStatus };
