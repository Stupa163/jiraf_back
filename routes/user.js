const express = require('express');
const HttpManager = require('../manager/HttpManager');
const ProjectRepository = require('../repository/ProjectRepository');

const router = express.Router();
const Metric = require('../dto/Metric');

router.get('/metrics', async (req, res) => {
    try {
        const metric = new Metric(
            await ProjectRepository.countProject(req.userId),
            await ProjectRepository.countOnGoingProject(req.userId),
            (await ProjectRepository.getTurnover(req.userId))[0].dataValues.total,
            parseFloat((await ProjectRepository.getAverageHourlyRate(req.userId))[0].dataValues.averageHourlyRate),
        );

        HttpManager.renderSuccess(res, { metric });
    } catch (e) {
        HttpManager.renderError(res, e, e.code || 400);
    }
});

module.exports = router;
