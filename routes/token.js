const express = require('express');
const jwt = require('jsonwebtoken');
const HttpManager = require('../manager/HttpManager');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        HttpManager.hasRequiredFields('token');
        const decodedToken = jwt.decode(req.body.token);
        const token = jwt.sign(
            {
                userId: decodedToken.userId,
            },
            process.env.RANDOM_TOKEN_SECRET,
            {
                expiresIn: process.env.TOKEN_EXPIRATION_DELAY,
            },
        );

        HttpManager.renderSuccess(res, {token});

    } catch (e) {
        HttpManager.renderError(res, e, e.code || 400)
    }
});

module.exports = router;
