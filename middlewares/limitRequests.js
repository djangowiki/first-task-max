const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins.
  max: 1,
});

module.exports = rateLimit;
