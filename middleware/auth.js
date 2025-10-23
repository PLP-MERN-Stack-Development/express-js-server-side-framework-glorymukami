const { AuthenticationError } = require('./errors');

const authenticate = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey || apiKey !== process.env.API_KEY) {
        throw new AuthenticationError('Invalid or missing API key');
    }
    
    next();
};

module.exports = authenticate;