const express = require('express');

const router = express.Router();
const { instanciateModelFromRequest, updateModelFromRequest } = require('../manager/ModelsManager');
const HttpManager = require('../manager/HttpManager');
const Models = require('../models');
const ModelNotFoundError = require('../error/Sequelize/ModelNotFoundError');

router.get('/', async (req, res) => {
    try {
        const sprints = await Models.Sprint.findAll({
            include: [{
                model: Models.Project,
                where: { user: req.userId },
            }, {
                model: Models.Task,
            }],
        });
        HttpManager.renderSuccess(res, { sprints });
    } catch (e) {
        HttpManager.renderError(res, e, e.code || 400);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const sprint = await Models.Sprint.findOne({
            where: { id: req.params.id },
            include: [{
                model: Models.Project,
                where: { user: req.userId },
            }, {
                model: Models.Task
            }],
        });
        if (sprint !== null) {
            HttpManager.renderSuccess(res, { sprint });
        } else {
            HttpManager.renderError(res, new ModelNotFoundError('sprint'), 404);
        }
    } catch (e) {
        HttpManager.renderError(res, e, e.code || 400);
    }
});

router.post('/', async (req, res) => {
    try {
        const sprint = await instanciateModelFromRequest(Models.Sprint, req.body);
        const savedSprint = await sprint.save();
        HttpManager.renderSuccess(res, { sprint: savedSprint }, 201);
    } catch (e) {
        HttpManager.renderError(res, e, e.code || 400);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const sprint = await Models.Sprint.findByPk(req.params.id);
        if (sprint !== null) {
            const updatedSprint = await updateModelFromRequest(sprint, req.body);
            const savedSprint = await updatedSprint.save();
            HttpManager.renderSuccess(res, { sprint: savedSprint });
        } else {
            HttpManager.renderError(res, new ModelNotFoundError(), 404);
        }
    } catch (e) {
        HttpManager.renderError(res, e, e.code || 400);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const sprint = await Models.Sprint.findByPk(req.params.id);
        if (sprint !== null) {
            sprint.destroy();
            HttpManager.renderSuccess(res, { result: 'deleted' });
        } else {
            HttpManager.renderError(res, new ModelNotFoundError('sprint'), 404);
        }
    } catch (e) {
        HttpManager.renderError(res, e, e.code || 400);
    }
});

module.exports = router;
