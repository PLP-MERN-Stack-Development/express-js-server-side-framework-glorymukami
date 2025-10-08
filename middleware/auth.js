// middleware/auth.js
const { apiKey } = require('../config');

module.exports = (req, res, next) => {
  const key = req.headers['x-api-key'];
  if (!key || key !== apiKey) {
    return res.status(401).json({ error: 'Unauthorized. Invalid API Key.' });
  }
  next();
};
