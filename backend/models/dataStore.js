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
const units = [];
const activeTokens = new Map();

// Utility helpers for the rest of the application to use.
module.exports = {
  users,
  callTypes,
  systemConfig,
  calls,
  units,
  activeTokens,
  nextId: () => crypto.randomUUID(),
  createUnit(owner = null, createdBy = 'system') {
    let number = null;
    let callSign = null;

    // Generate a unique two-digit number (10-99)
    do {
      number = String(Math.floor(Math.random() * 90) + 10);
    } while (units.find((u) => u.number === number));

    // Generate a unique callsign like 2Y-101
    const letter = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));
    do {
      callSign = `${Math.floor(Math.random() * 8) + 1}${letter()}-${Math.floor(Math.random() * 900) + 100}`;
    } while (units.find((u) => u.callSign === callSign));

    const unit = {
      id: crypto.randomUUID(),
      number,
      callSign,
      status: 'Available',
      owner,
      createdBy,
    };

    units.push(unit);
    return unit;
  },
};
