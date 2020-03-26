const express = require('express');

const router = express.Router();
const { instanciateModelFromRequest, updateModelFromRequest } = require('../manager/ModelsManager');
const HttpManager = require('../manager/HttpManager');
const Models = require('../models');
const ModelNotFoundError = require('../error/Sequelize/ModelNotFoundError');
const EmailAlreadyUserError = require('../error/Registration/EmailAlreadyUserError');

router.get('/all', async (req, res) => {
    try {
        let clients = await Models.Client.findAll();
        HttpManager.renderSuccess(res, {clients});
    } catch (e) {
        HttpManager.renderError(res, e, e.code || 400);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const client = await Models.Client.findByPk(req.params.id);
        if (client !== null) {
            HttpManager.renderSuccess(res, { client });
        } else {
            HttpManager.renderError(res, new ModelNotFoundError('client'), 404);
        }
    } catch (e) {
        HttpManager.renderError(res, e, e.code || 400);
    }
});

router.post('/', async (req, res) => {
    try {
        const client = await instanciateModelFromRequest(Models.Client, req.body);

        let currentClient = await Models.Client.findOne({
            where: {mail: req.body.mail}
        });

        if (currentClient === null) {
            const savedClient = await client.save();
            HttpManager.renderSuccess(res, { client: savedClient }, 201);
        } else {
            HttpManager.renderError(res, new EmailAlreadyUserError());
        }
    } catch (e) {
        HttpManager.renderError(res, e, e.code || 400);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const client = await Models.Client.findByPk(req.params.id);
        if (client !== null) {
            const updatedClient = await updateModelFromRequest(client, req.body);
            const savedClient = await updatedClient.save();
            HttpManager.renderSuccess(res, { client: savedClient });
        } else {
            HttpManager.renderError(res, new ModelNotFoundError(), 404);
        }
    } catch (e) {
        HttpManager.renderError(res, e, e.code || 400);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const client = await Models.Client.findByPk(req.params.id);
        if (client !== null) {
            client.destroy();
            HttpManager.renderSuccess(res, { result: 'deleted' });
        } else {
            HttpManager.renderError(res, new ModelNotFoundError('client'), 404);
        }
    } catch (e) {
        HttpManager.renderError(res, e, e.code || 400);
    }
});

module.exports = router;
