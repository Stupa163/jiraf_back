const express = require('express');
const jwt = require('jsonwebtoken');
const HttpManager = require('../manager/HttpManager');
const RegisterManager = require('../manager/RegisterManager');
const Models = require('../models');
const router = express.Router();
const EmailAlreadyUserError = require('../error/Registration/EmailAlreadyUserError');

/* GET home page. */
router.post('/', async (req, res) => {
    const { body } = req;
    try {
        HttpManager.hasRequiredFields(body, 'firstName', 'lastName', 'mail', 'plainPassword', 'phone', 'profile');
        HttpManager.hasRequiredFields(body, 'companyName', 'companySiret', 'companyStatus');
        let currentUser = await Models.User.findOne({
            where: {mail: body.mail}
        });

        console.log('user', currentUser)

        if (currentUser === null) {
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
        } else {
            HttpManager.renderError(res, new EmailAlreadyUserError());
        }
    } catch (e) {
        HttpManager.renderError(res, e, e.code || 400);
    }
});

module.exports = router;
