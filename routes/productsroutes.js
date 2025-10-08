// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const validateProduct = require('../middleware/validateProduct');

// GET all products (supports query, pagination, search)
router.get('/', async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 5 } = req.query;
    const query = {};

    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };

    const products = await Product.find(query)
      .limit(Number(limit))
      .skip((page - 1) * limit);

    res.json(products);
  } catch (error) {
    next(error);
  }
});

// GET single product by ID
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// POST create new product
router.post('/', validateProduct, async (req, res, next) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

// PUT update product
router.put('/:id', validateProduct, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// DELETE product
router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
