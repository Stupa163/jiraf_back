const { RateLimiterMemory } = require('rate-limiter-flexible');
const { renderError } = require('../manager/HttpManager');
const TooManyRequestError = require('../error/Request/TooManyRequestError');

/**
 * @method consume
 */
const rateLimiter = new RateLimiterMemory({
  points: process.env.LIMIT_REQUEST_PER_MINUTE || 10,
  duration: 60,
  blockDuration: process.env.BLOCK_DURATION || 60,
});

exports.permit = () => async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (e) {
    renderError(res, new TooManyRequestError(), 429);
  }
};
