const express = require('express');
const router = express.Router();
const {instanciateModelFromRequest, updateModelFromRequest} = require('../manager/ModelsManager');
const HttpManager = require('../manager/HttpManager');
const Models = require('../models');
const ModelNotFoundError = require('../error/Sequelize/ModelNotFoundError');

router.get('/:id', async (req, res) => {
    try {
        let project = await Models.Project.findByPk(req.params.id);
        if (project !== null) {
            HttpManager.renderSuccess(res, {project});
        } else {
            HttpManager.renderError(res, new ModelNotFoundError('project'), 404);
        }
    } catch (e) {
        HttpManager.renderError(req, e, e.code || 400)
    }
});

router.post('/', async (req, res) => {
    try {
        let project = await instanciateModelFromRequest(Models.Project, req.body);
        let savedProject = await project.save();
        HttpManager.renderSuccess(res, {project: savedProject}, 201);
    } catch (e) {
        HttpManager.renderError(res, e, e.code || 400);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        let project = await Models.Project.findByPk(req.params.id);
        if (project !== null) {
            let updatedProject = await updateModelFromRequest(project, req.body);
            let savedProject = await updatedProject.save();
            HttpManager.renderSuccess(res, {project: savedProject});
        } else {
            HttpManager.renderError(res, new ModelNotFoundError('project'), 404);
        }
    } catch (e) {
        HttpManager.renderError(req, e, e.code || 400)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let project = await Models.Project.findByPk(req.params.id);
        if (project !== null) {
            project.destroy();
            HttpManager.renderSuccess(res, {result: 'deleted'});
        } else {
            HttpManager.renderError(res, new ModelNotFoundError('project'), 404);
        }
    } catch (e) {
        HttpManager.renderError(req, e, e.code || 400)
    }
});

module.exports = router;
