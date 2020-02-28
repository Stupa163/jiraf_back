const jwt = require('jsonwebtoken');
const { renderError } = require('../manager/HttpManager');
const UnauthorizedAccessError = require('../error/Request/UnauthorizedAccessError');

exports.allowConnectedUsersOnly = () => async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token === undefined) {
      // noinspection ExceptionCaughtLocallyJS
      throw new UnauthorizedAccessError();
    }
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    const { userId } = decodedToken;
    if (req.body.userId && req.body.userId !== userId) {
      // noinspection ExceptionCaughtLocallyJS
      throw new UnauthorizedAccessError();
    } else {
      req.userId = userId;
      next();
    }
  } catch (error) {
    renderError(res, error, error.code || 401);
  }
};
