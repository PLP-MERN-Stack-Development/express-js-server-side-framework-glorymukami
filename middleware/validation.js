const { ValidationError } = require('./errors');

const validateProduct = (req, res, next) => {
    const { name, description, price, category } = req.body;
    const errors = [];

    if (!name || name.trim() === '') errors.push('Name is required');
    if (!description || description.trim() === '') errors.push('Description is required');
    if (!price || isNaN(price)) errors.push('Valid price is required');
    if (!category || category.trim() === '') errors.push('Category is required');

    if (errors.length > 0) {
        throw new ValidationError('Product validation failed', errors);
    }

    next();
};

module.exports = { validateProduct };