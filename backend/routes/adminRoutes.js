const express = require('express');
const {
  listUsers,
  createUser,
  listCallTypes,
  addCallType,
  getConfig,
  updateConfig,
  listUnits,
} = require('../controllers/adminController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// User management
router.get('/users', requireAuth('admin'), listUsers);
router.post('/users', requireAuth('admin'), createUser);

// Call types
router.get('/call-types', requireAuth('admin'), listCallTypes);
router.post('/call-types', requireAuth('admin'), addCallType);

// System configuration
router.get('/config', requireAuth('admin'), getConfig);
router.patch('/config', requireAuth('admin'), updateConfig);

router.get('/units', requireAuth('admin'), listUnits);

module.exports = router;
