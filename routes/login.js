const express = require('express');
const jwt = require('jsonwebtoken');
const { renderError, renderSuccess, hasRequiredFields } = require('../manager/HttpManager');
const WrongPasswordError = require('../error/Login/WrongPasswordError');
const WrongEmailError = require('../error/Login/WrongEmailError');

const router = express.Router();
const Models = require('../models');

router.post('/', async (req, res) => {
  const body = JSON.parse(JSON.stringify(req.body));
  try {
    hasRequiredFields(body, 'mail', 'plainPassword');
    const user = await Models.User
      .scope('passwordIncluded')
      .findOne({
        where: {
          mail: body.mail
        }
      });
    if (user !== null) {
      if (await user.isPasswordValid(body.plainPassword)) {
        const token = jwt.sign(
          {
            userId: user.id
          },
          process.env.RANDOM_TOKEN_SECRET,
          {
            expiresIn: process.env.TOKEN_EXPIRATION_DELAY
          }
        );
        // To not return the password even tho it is hashed
        user.password = undefined;
        renderSuccess(res, { user, token });
      } else {
        renderError(res, new WrongPasswordError());
      }
    } else {
      renderError(res, new WrongEmailError());
    }
  } catch (e) {
    renderError(res, e, e.code || 400);
  }
});

module.exports = router;
