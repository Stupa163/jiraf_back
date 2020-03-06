const express = require('express');
const jwt = require('jsonwebtoken');
const HttpManager = require('../manager/HttpManager');
const RegisterManager = require('../manager/RegisterManager');

const router = express.Router();

/* GET home page. */
router.post('/', async (req, res) => {
  const { body } = req;
  try {
    HttpManager.hasRequiredFields(body, 'firstName', 'lastName', 'mail', 'plainPassword', 'phone', 'profile');
    HttpManager.hasRequiredFields(body, 'companyName', 'companySiret', 'companyStatus');
    const company = RegisterManager.createCompany(body.companyName, body.companySiret, body.companyStatus);
    const savedCompany = await company.save();

    const user = await RegisterManager.createUser(
      body.firstName,
      body.lastName,
      body.plainPassword,
      body.mail,
      body.phone,
      body.profile,
      savedCompany.id,
    );
    const savedUser = await user.save();

    const token = jwt.sign(
      { userId: savedUser.id },
      process.env.RANDOM_TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION_DELAY },
    );
    // To not return the password even tho it is hashed
    savedUser.password = undefined;
    HttpManager.renderSuccess(res, { company: savedCompany, user: savedUser, token });
  } catch (e) {
    HttpManager.renderError(res, e, e.code || 400);
  }
});

module.exports = router;
