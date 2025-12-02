// Officers can review their assigned calls and update status.
const { calls, units, createUnit } = require('../models/dataStore');

function myCalls(req, res) {
  const assigned = calls.filter((c) => c.assignedUnitOwner === req.user.username);
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

function myUnits(req, res) {
  const mine = units.filter((u) => u.owner === req.user.username);
  res.json(mine);
}

function createOfficerUnit(req, res) {
  const unit = createUnit(req.user.username, req.user.username);
  res.status(201).json(unit);
}

module.exports = { myCalls, updateOfficerStatus, myUnits, createOfficerUnit };
