const jwt = require('jsonwebtoken');
const { renderError } = require('../manager/HttpManager');
const NoTokenProvidedError = require('../error/Request/NoTokenProvidedError');
const UnpaidAccountError = require('../error/Request/UnpaidAccountError');
const Models = require('../models');

exports.allowConnectedUsersOnly = () => async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (token === undefined) {
            // noinspection ExceptionCaughtLocallyJS
            throw new NoTokenProvidedError();
        }
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
        const { userId } = decodedToken;
        if (req.body.userId && req.body.userId !== userId) {
            // noinspection ExceptionCaughtLocallyJS
            throw new NoTokenProvidedError();
        } else {
            req.userId = userId;
            next();
        }
    } catch (error) {
        renderError(res, error, error.code || 401);
    }
};

exports.allowUserWhoPaidOnly = () => async (req, res, next) => {
    try {
        const user = await Models.User.findByPk(req.userId);
        if (user.hasPaid()) {
            next();
        } else {
            renderError(res, new UnpaidAccountError(), 402);
        }
    } catch (e) {
        renderError(res, e, e.code || 401);
    }
};
