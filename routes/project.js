const express = require('express');
const op = require('sequelize').Op;
const axios = require('axios');

const router = express.Router();
const { instanciateModelFromRequest, updateModelFromRequest } = require('../manager/ModelsManager');
const HttpManager = require('../manager/HttpManager');
const Models = require('../models');
const ModelNotFoundError = require('../error/Sequelize/ModelNotFoundError');
const MarkdownNotFoundError = require('../error/GithubAPI/MarkdownNotFoundError');

const GITHUB_API_URI = 'https://api.github.com';

router.get('/', async (req, res) => {
    try {
        const projects = await Models.Project.findAll({
            where: { user: req.userId },
            include: [{
                model: Models.Sprint,
                include: [{
                    model: Models.Task,
                }],
            }],
        });
        HttpManager.renderSuccess(res, { projects });
    } catch (e) {
        HttpManager.renderError(res, e, e.code || 400);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const project = await Models.Project.findOne({
            where: {
                [op.and]: [
                    { user: req.userId },
                    { id: req.params.id },
                ],
            },
            include: [{
                model: Models.Sprint,
                include: [{
                    model: Models.Task,
                }],
            }],
        });
        if (project !== null) {
            HttpManager.renderSuccess(res, { project });
        } else {
            HttpManager.renderError(res, new ModelNotFoundError('project'), 404);
        }
    } catch (e) {
        HttpManager.renderError(res, e, e.code || 400);
    }
});

router.post('/', async (req, res) => {
    try {
        const client = await Models.Client.findOne({
            where: { mail: req.body.client },
        });
        if (client === null) {
            HttpManager.renderError(res, new ModelNotFoundError('client'), 404);
        }
        const project = await instanciateModelFromRequest(Models.Project, req.body);
        project.user = req.userId;
        project.client = client.id;
        const savedProject = await project.save();
        HttpManager.renderSuccess(res, { project: savedProject }, 201);
    } catch (e) {
        HttpManager.renderError(res, e, e.code || 400);
    }
});

router.post('/createFromRepository', async (req, res) => {
    try {
        const body = JSON.parse(JSON.stringify(req.body));
        HttpManager.hasRequiredFields(body, 'pseudo', 'password', 'repoName');

        await axios.get(
            `${GITHUB_API_URI}/repos/${body.pseudo}/${body.repoName}/contents/wedev.config`,
            {
                auth: {
                    username: body.pseudo,
                    password: body.password,
                },
            },
        )
            .then(async (configFile) => {
                try {
                    let config = (new Buffer.from(configFile.data.content, 'base64').toString());
                    config = JSON.parse(config.replace(/\\n|\r|\s|\\/g, ''));

                    HttpManager.hasRequiredFields(config, 'client');
                    const client = await Models.Client.findOne({
                        where: { mail: config.client },
                    });
                    if (client === null) {
                        HttpManager.renderError(res, new ModelNotFoundError('client'), 404);
                    }

                    const project = await instanciateModelFromRequest(Models.Project, config);
                    project.client = client.id;
                    project.user = req.userId;
                    project.githubRepository = `https://github.com/${body.pseudo}/${body.repoName}`;
                    const savedProject = await project.save();
                    HttpManager.renderSuccess(res, { project: savedProject }, 201);
                } catch (e) {
                    HttpManager.renderError(res, e, 400);
                }
            }).catch((error) => {
                if (error.response.status === 404) {
                    HttpManager.renderError(res, new MarkdownNotFoundError(), 404);
                } else {
                    throw error;
                }
            });
    } catch (e) {
        HttpManager.renderError(res, e, e.code || 400);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const project = await Models.Project.findByPk(req.params.id);
        if (project !== null) {
            const updatedProject = await updateModelFromRequest(project, req.body);
            const savedProject = await updatedProject.save();
            HttpManager.renderSuccess(res, { project: savedProject });
        } else {
            HttpManager.renderError(res, new ModelNotFoundError('project'), 404);
        }
    } catch (e) {
        HttpManager.renderError(res, e, e.code || 400);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const project = await Models.Project.findByPk(req.params.id);
        if (project !== null) {
            project.destroy();
            HttpManager.renderSuccess(res, { result: 'deleted' });
        } else {
            HttpManager.renderError(res, new ModelNotFoundError('project'), 404);
        }
    } catch (e) {
        HttpManager.renderError(res, e, e.code || 400);
    }
});

module.exports = router;
