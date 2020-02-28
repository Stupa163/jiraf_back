const express = require('express');
const router = express.Router();
const {instanciateModelFromRequest, updateModelFromRequest} = require('../manager/ModelsManager');
const HttpManager = require('../manager/HttpManager');
const Models = require('../models');
const ModelNotFoundError = require('../error/Sequelize/ModelNotFoundError');

router.get('/:id', async (req, res) => {
    try {
        let sprint = await Models.Sprint.findByPk(req.params.id);
        if (sprint !== null) {
            HttpManager.renderSuccess(res, {sprint});
        } else {
            HttpManager.renderError(res, new ModelNotFoundError('sprint'), 404);
        }
    } catch (e) {
        HttpManager.renderError(req, e, e.code || 400)
    }
});

router.post('/', async (req, res) => {
    try {
        let sprint = await instanciateModelFromRequest(Models.Sprint, req.body);
        let savedSprint = await sprint.save();
        HttpManager.renderSuccess(res, {sprint: savedSprint}, 201);
    } catch (e) {
        HttpManager.renderError(res, e, e.code || 400);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        let sprint = await Models.Sprint.findByPk(req.params.id);
        if (sprint !== null) {
            let updatedSprint = await updateModelFromRequest(sprint, req.body);
            let savedSprint = await updatedSprint.save();
            HttpManager.renderSuccess(res, {sprint: savedSprint});
        } else {
            HttpManager.renderError(res, new ModelNotFoundError(), 404);
        }
    } catch (e) {
      HttpManager.renderError(req, e, e.code || 400)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let sprint = await Models.Sprint.findByPk(req.params.id);
        if (sprint !== null) {
            sprint.destroy();
            HttpManager.renderSuccess(res, {result: 'deleted'});
        } else {
            HttpManager.renderError(res, new ModelNotFoundError('sprint'), 404);
        }
    } catch (e) {
        HttpManager.renderError(req, e, e.code || 400)
    }
});

module.exports = router;
