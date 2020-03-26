const express = require('express');

const router = express.Router();
const stripe = require('stripe')('sk_test_Ab4UZQSK9AInlKi6WdeIENgy00XNL8ofx5');
const HttpManager = require('../manager/HttpManager');

router.post('/', async (req, res) => {
    try {
        HttpManager.hasRequiredFields(req.body, 'cardNumber', 'expirationDate', 'cvc');
        const cardDetails = req.body.expirationDate.split('/');
        const card = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                number: req.body.cardNumber,
                exp_month: +cardDetails[0],
                exp_year: +`20${cardDetails[1]}`,
                cvc: req.body.cvc,
            },
        });

        const intent = await stripe.paymentIntents.create({
            amount: 45000,
            currency: 'eur',
            payment_method_types: ['card'],
            confirm: true,
            payment_method: card.id,
        });

        HttpManager.renderSuccess(res, { amount: intent.amount });
    } catch (e) {
        HttpManager.renderError(res, e, 400);
    }
});

module.exports = router;
