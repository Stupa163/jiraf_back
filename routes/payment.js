const express = require('express');
const HttpManager = require('../manager/HttpManager');
const router = express.Router();
const stripe = require('stripe')('sk_test_Ab4UZQSK9AInlKi6WdeIENgy00XNL8ofx5');

router.post('/', async (req, res) => {
    try {
        HttpManager.hasRequiredFields(req.body, 'cardNumber', 'expirationDate', 'cvc');
        let cardDetails = req.body.expirationDate.split('/');
        let card = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                number: req.body.cardNumber,
                exp_month: +cardDetails[0],
                exp_year: +`20${cardDetails[1]}`,
                cvc: req.body.cvc,
            },
        });

        let intent = await stripe.paymentIntents.create({
            amount: 45000,
            currency: 'eur',
            payment_method_types: ['card'],
            confirm: true,
            payment_method: card.id,
        });

        HttpManager.renderSuccess(res, {amount: intent.amount});
    } catch (e) {
        HttpManager.renderError(res, e, 400);
    }
});

module.exports = router;
