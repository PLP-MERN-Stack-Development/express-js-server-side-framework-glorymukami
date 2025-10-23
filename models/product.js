const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Product description is required']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price cannot be negative']
    },
    category: {
        type: String,
        required: [true, 'Product category is required']
    },
    inStock: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true // This adds createdAt and updatedAt automatically
});

// We'll use MongoDB's built-in _id instead of a separate id field
module.exports = mongoose.model('Product', productSchema);