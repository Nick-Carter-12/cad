// Dispatchers triage calls, assign units, and update call status.
const { calls, units, createUnit } = require('../models/dataStore');

function listCalls(_req, res) {
  res.json(calls);
}

function listUnits(_req, res) {
  res.json(units);
}

function addUnit(req, res) {
  const owner = req.body.owner || null;
  const unit = createUnit(owner, req.user.username);
  res.status(201).json(unit);
}

function removeUnit(req, res) {
  const { id } = req.params;
  const idx = units.findIndex((u) => u.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Unit not found' });
  }
  const [removed] = units.splice(idx, 1);
  calls.forEach((call) => {
    if (call.assignedUnitId === id) {
      call.assignedUnitId = null;
      call.assignedUnitNumber = null;
      call.assignedUnit = null;
      call.assignedUnitOwner = null;
      if (call.status === 'Dispatched') {
        call.status = 'Pending';
      }
    }
  });
  res.json({ success: true, removed });
}

function assignUnit(req, res) {
  const { id } = req.params;
  const { unitId } = req.body;
  const call = calls.find((c) => c.id === id);
  if (!call) {
    return res.status(404).json({ error: 'Call not found' });
  }

  const unit = units.find((u) => u.id === unitId);
  if (!unit) {
    return res.status(404).json({ error: 'Unit not found' });
  }

  call.assignedUnitId = unit.id;
  call.assignedUnitNumber = unit.number;
  call.assignedUnit = unit.callSign;
  call.assignedUnitOwner = unit.owner;
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

module.exports = { listCalls, listUnits, addUnit, removeUnit, assignUnit, updateStatus };
