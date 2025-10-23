require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const { errorHandler } = require('./middleware/errors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/week2_assignment')
.then(() => console.log('✅ Connected to MongoDB locally'))
.catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('💡 Make sure MongoDB Compass is running on localhost:27017');
});

// Basic root route
app.get('/', (req, res) => {
    res.json({ 
        message: '🎉 Hello World! Week 2 Backend Server is running!',
        timestamp: new Date().toISOString(),
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        environment: process.env.NODE_ENV,
        version: '1.0.0'
    });
});

// API info route
app.get('/api', (req, res) => {
    res.json({
        success: true,
        message: 'Products API is working!',
        endpoints: {
            products: {
                'GET /api/products': 'Get all products (with filtering & pagination)',
                'GET /api/products/:id': 'Get single product',
                'POST /api/products': 'Create new product (requires API key)',
                'PUT /api/products/:id': 'Update product (requires API key)',
                'DELETE /api/products/:id': 'Delete product (requires API key)',
                'GET /api/products/search?q=query': 'Search products by name',
                'GET /api/products/stats': 'Get product statistics'
            },
            features: ['Filtering by category', 'Pagination', 'Search', 'Statistics', 'Authentication']
        }
    });
});

// Use product routes
app.use('/api/products', productRoutes);

// Global 404 handler for undefined routes
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        requestedUrl: req.originalUrl,
        availableEndpoints: [
            'GET /',
            'GET /api',
            'GET /api/products',
            'GET /api/products/:id',
            'POST /api/products',
            'PUT /api/products/:id',
            'DELETE /api/products/:id',
            'GET /api/products/search',
            'GET /api/products/stats'
        ]
    });
});

// Global error handling middleware (MUST BE LAST)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV}`);
    console.log(`🗄️  Database: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    console.log(`⏰ Started at: ${new Date().toISOString()}`);
});