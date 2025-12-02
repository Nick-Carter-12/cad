// Entry point for the multi-portal CAD demo API.
// Sets up the Express server, common middleware, and portal-specific routes.
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const civRoutes = require('./routes/civRoutes');
const dispatchRoutes = require('./routes/dispatchRoutes');
const policeRoutes = require('./routes/policeRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Basic middleware used by all routes.
app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));

// Mount API routes for each portal.
app.use('/auth', authRoutes);
app.use('/civ', civRoutes);
app.use('/dispatch', dispatchRoutes);
app.use('/police', policeRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CAD demo API listening on port ${PORT}`);
});
