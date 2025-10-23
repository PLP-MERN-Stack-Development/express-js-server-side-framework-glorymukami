const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Don't forget to call next()!
};

module.exports = logger;