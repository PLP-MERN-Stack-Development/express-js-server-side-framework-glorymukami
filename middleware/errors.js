// Custom error classes
class NotFoundError extends Error {
    constructor(message = 'Resource not found') {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}

class ValidationError extends Error {
    constructor(message = 'Validation failed', errors = []) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 400;
        this.errors = errors;
    }
}

class AuthenticationError extends Error {
    constructor(message = 'Authentication required') {
        super(message);
        this.name = 'AuthenticationError';
        this.statusCode = 401;
    }
}

// Async error handler wrapper
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Global error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error('🚨 Error:', err.stack);

    let error = { ...err };
    error.message = err.message;

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = 'Resource not found';
        error = new NotFoundError(message);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new ValidationError(message);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        error = new ValidationError('Validation failed', messages);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server Error',
        errors: error.errors || undefined,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    });
};

module.exports = {
    NotFoundError,
    ValidationError,
    AuthenticationError,
    asyncHandler,
    errorHandler
};