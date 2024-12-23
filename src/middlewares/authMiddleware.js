
  // src/middlewares/rateLimiter.js
const rateLimit = require('express-rate-limit');
const authenticateUser = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ error: 'Unauthorized' });
  };
  

  
  module.exports = { authenticateUser };
  
  const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
  });
  
  module.exports = { rateLimiter };