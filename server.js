// server.js
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const config = require('./config');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const productRoutes = require('./routes/products');

// Initialize app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Public route
app.get('/', (req, res) => {
  res.send('Hello World from Express API 🚀');
});

// Protected product routes
app.use('/api/products', auth, productRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Start server
app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
});
