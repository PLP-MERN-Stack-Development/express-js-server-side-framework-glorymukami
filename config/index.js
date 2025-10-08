// config/index.js
require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/express_api_db',
  apiKey: process.env.API_KEY || '12345',
  nodeEnv: process.env.NODE_ENV || 'development'
};

module.exports = config;
