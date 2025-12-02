// Admins can manage users, call types, and configuration.
const { users, callTypes, systemConfig } = require('../models/dataStore');

function listUsers(_req, res) {
  res.json(users.map(({ password, ...rest }) => rest));
}

function createUser(req, res) {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({ error: 'username, password, and role are required' });
  }
  if (users.find((u) => u.username === username)) {
    return res.status(409).json({ error: 'User already exists' });
  }
  users.push({ username, password, role });
  res.status(201).json({ username, role });
}

function listCallTypes(_req, res) {
  res.json(callTypes);
}

function addCallType(req, res) {
  const { type } = req.body;
  if (!type) {
    return res.status(400).json({ error: 'type is required' });
  }
  callTypes.push(type);
  res.status(201).json(callTypes);
}

function getConfig(_req, res) {
  res.json(systemConfig);
}

function updateConfig(req, res) {
  Object.assign(systemConfig, req.body || {});
  res.json(systemConfig);
}

module.exports = { listUsers, createUser, listCallTypes, addCallType, getConfig, updateConfig };
