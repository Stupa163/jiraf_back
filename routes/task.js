const express = require('express');

const router = express.Router();
const { instanciateModelFromRequest, updateModelFromRequest } = require('../manager/ModelsManager');
const HttpManager = require('../manager/HttpManager');
const Models = require('../models');
const ModelNotFoundError = require('../error/Sequelize/ModelNotFoundError');

router.get('/:id', async (req, res) => {
  try {
    const task = await Models.Task.findByPk(req.params.id);
    if (task !== null) {
      HttpManager.renderSuccess(res, { task });
    } else {
      HttpManager.renderError(res, new ModelNotFoundError('task'), 404);
    }
  } catch (e) {
    HttpManager.renderError(req, e, e.code || 400);
  }
});

router.post('/', async (req, res) => {
  try {
    const task = await instanciateModelFromRequest(Models.Task, req.body);
    const savedTask = await task.save();
    HttpManager.renderSuccess(res, { task: savedTask }, 201);
  } catch (e) {
    HttpManager.renderError(res, e, e.code || 400);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const task = await Models.Task.findByPk(req.params.id);
    if (task !== null) {
      const updatedTask = await updateModelFromRequest(task, req.body);
      const savedTask = await updatedTask.save();
      HttpManager.renderSuccess(res, { task: savedTask });
    } else {
      HttpManager.renderError(res, new ModelNotFoundError(), 404);
    }
  } catch (e) {
    HttpManager.renderError(req, e, e.code || 400);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const task = await Models.Task.findByPk(req.params.id);
    if (task !== null) {
      task.destroy();
      HttpManager.renderSuccess(res, { result: 'deleted' });
    } else {
      HttpManager.renderError(res, new ModelNotFoundError('task'), 404);
    }
  } catch (e) {
    HttpManager.renderError(req, e, e.code || 400);
  }
});

module.exports = router;
