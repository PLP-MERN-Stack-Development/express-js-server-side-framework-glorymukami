const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const logger = require('../middleware/logger');
const authenticate = require('../middleware/auth');
const { validateProduct } = require('../middleware/validation');

// Apply logger middleware to all product routes
router.use(logger);

// ===== ROUTES =====

// GET /api/products - List all products with filtering & pagination
router.get('/', async (req, res) => {
    try {
        const { category, inStock, page = 1, limit = 10 } = req.query;
        
        // Build filter object
        let filter = {};
        if (category) filter.category = category;
        if (inStock !== undefined) filter.inStock = inStock === 'true';
        
        // Calculate pagination
        const skip = (page - 1) * limit;
        
        // Get products with filtering and pagination
        const products = await Product.find(filter)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });
        
        // Get total count for pagination info
        const total = await Product.countDocuments(filter);
        
        res.json({
            success: true,
            count: products.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message
        });
    }
});

// GET /api/products/search - Search products by name
router.get('/search', async (req, res) => {
    try {
        const { q } = req.query;
        
        if (!q) {
            return res.status(400).json({
                success: false,
                message: 'Search query (q) is required'
            });
        }
        
        const products = await Product.find({
            name: { $regex: q, $options: 'i' } // Case-insensitive search
        });
        
        res.json({
            success: true,
            count: products.length,
            searchQuery: q,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error searching products',
            error: error.message
        });
    }
});

// GET /api/products/stats - Get product statistics
router.get('/stats', async (req, res) => {
    try {
        const stats = await Product.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                    totalValue: { $sum: '$price' },
                    averagePrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' }
                }
            },
            {
                $project: {
                    category: '$_id',
                    count: 1,
                    totalValue: 1,
                    averagePrice: { $round: ['$averagePrice', 2] },
                    minPrice: 1,
                    maxPrice: 1,
                    _id: 0
                }
            },
            { $sort: { count: -1 } }
        ]);
        
        const totalProducts = await Product.countDocuments();
        const inStockCount = await Product.countDocuments({ inStock: true });
        const outOfStockCount = totalProducts - inStockCount;
        
        res.json({
            success: true,
            data: {
                summary: {
                    totalProducts,
                    inStockCount,
                    outOfStockCount,
                    inStockPercentage: Math.round((inStockCount / totalProducts) * 100)
                },
                byCategory: stats
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error generating statistics',
            error: error.message
        });
    }
});

// GET /api/products/:id - Get specific product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching product',
            error: error.message
        });
    }
});

// POST /api/products - Create new product (WITH AUTH + VALIDATION)
router.post('/', authenticate, validateProduct, async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: savedProduct
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating product',
            error: error.message
        });
    }
});

// PUT /api/products/:id - Update product (WITH AUTH + VALIDATION)
router.put('/:id', authenticate, validateProduct, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            message: 'Product updated successfully',
            data: product
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating product',
            error: error.message
        });
    }
});

// DELETE /api/products/:id - Delete product (WITH AUTH)
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            message: 'Product deleted successfully',
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting product',
            error: error.message
        });
    }
});

module.exports = router;