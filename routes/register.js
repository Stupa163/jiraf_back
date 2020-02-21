const express = require('express');
const HttpManager = require('../manager/HttpManager');
const RegisterManager = require('../manager/RegisterManager');
const router = express.Router();
const jwt = require('jsonwebtoken');

/* GET home page. */
router.post('/', async (req, res) => {
    let body = req.body;
    try  {
        HttpManager.hasRequiredFields(body, 'firstName', 'lastName', 'plainPassword', 'phone', 'profile', 'companyName', 'companySiret', 'companyStatus');
        let company = RegisterManager.createCompany(body.companyName, body.companySiret, body.companyStatus);
        let savedCompany = await company.save();

        let user = await RegisterManager.createUser(body.firstName, body.lastName, body.plainPassword, body.mail, body.phone, body.profile, savedCompany.id);
        let savedUser = await user.save();

        const token = jwt.sign(
            { userId: savedUser.id },
            process.env.RANDOM_TOKEN_SECRET,
            { expiresIn: process.env.TOKEN_EXPIRATION_DELAY },
        );
        // To not return the password even tho it is hashed
        savedUser.password = undefined;
        HttpManager.renderSuccess(res, {company: savedCompany, user: savedUser, token})
    } catch (e) {
        HttpManager.renderError(res, e, e.code || 400)
    }
    res.json({ status: 'ok' });
});

module.exports = router;
