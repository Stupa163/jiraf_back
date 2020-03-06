const express = require('express');
const op = require('sequelize').Op;
const HttpManager = require('../manager/HttpManager');
const router = express.Router();
const axios = require('axios');
const Models = require('../models');
const NullRepositoryFieldError = require('../error/GithubAPI/NullRepositoryFieldError');
const ModelNotFoundError = require('../error/Sequelize/ModelNotFoundError');
const {buildBodyRequest} = require('../manager/GithubAPIManager');

const GITHUB_API_URI = 'https://api.github.com';

router.get('/:project', async (req, res) => {
    try {
        const project = await Models.Project.findOne({
            where: {
                [op.and]: [
                    {user: req.userId},
                    {id: req.params.project},
                ],
            },
        });

        if (project !== null) {
            if (project.githubRepository !== null) {
                const repoInfos = project.githubRepository.split('/');
                const body = JSON.parse(JSON.stringify(req.body));
                HttpManager.hasRequiredFields(body, 'pseudo', 'password');
                axios.get(
                    `${GITHUB_API_URI}/repos/${repoInfos[3]}/${repoInfos[4]}/issues`,
                    {
                        auth: {
                            username: body.pseudo,
                            password: body.password
                        }
                    }
                ).then((response) => {
                    HttpManager.renderSuccess(res, {issues: response.data}, 200);
                }).catch((error) => {
                    HttpManager.renderError(res, error.response.data, error.response.status);
                });
            } else {
                HttpManager.renderError(res, new NullRepositoryFieldError());
            }
        } else {
            HttpManager.renderError(res, new ModelNotFoundError('project'), 404);
        }

    } catch (e) {
        HttpManager.renderError(res, e, e.code || 400);
    }
});

router.post('/:project', async (req, res) => {
    try {
        const project = await Models.Project.findOne({
            where: {
                [op.and]: [
                    {user: req.userId},
                    {id: req.params.project},
                ],
            },
        });

        if (project !== null) {
            if (project.githubRepository !== null) {
                const repoInfos = project.githubRepository.split('/');
                const body = JSON.parse(JSON.stringify(req.body));
                HttpManager.hasRequiredFields(body, 'pseudo', 'password');
                HttpManager.hasRequiredFields(body, 'title', 'body', 'labels');
                axios.post(
                    `${GITHUB_API_URI}/repos/${repoInfos[3]}/${repoInfos[4]}/issues`,
                    buildBodyRequest(body.title, body.body, body.labels),
                    {
                        auth: {
                            username: body.pseudo,
                            password: body.password
                        }
                    }
                ).then((response) => {
                    HttpManager.renderSuccess(res, {url: response.data.url}, 201);
                }).catch((error) => {
                    HttpManager.renderError(res, error.response.data, error.response.status);
                });
            } else {
                HttpManager.renderError(res, new NullRepositoryFieldError());
            }
        } else {
            HttpManager.renderError(res, new ModelNotFoundError('project'), 404);
        }

    } catch (e) {
        HttpManager.renderError(res, e, e.code || 400);
    }
});

module.exports = router;
