// Simple in-memory data store to keep the demo self contained.
// A real system would persist these to a database.
const crypto = require('crypto');

const users = [
  { username: 'civ', password: 'civpass', role: 'civ' },
  { username: 'dispatch', password: 'dispatchpass', role: 'dispatch' },
  { username: 'police', password: 'policepass', role: 'police' },
  { username: 'admin', password: 'adminpass', role: 'admin' },
];

const callTypes = ['Traffic Stop', 'Suspicious Person', 'Theft'];
const systemConfig = { agencyName: 'Demo CAD', allowSelfAssign: true };

const calls = [];
const activeTokens = new Map();

// Utility helpers for the rest of the application to use.
module.exports = {
  users,
  callTypes,
  systemConfig,
  calls,
  activeTokens,
  nextId: () => crypto.randomUUID(),
};
