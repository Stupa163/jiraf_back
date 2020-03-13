const Models = require('../models');
const op = require('sequelize').Op;
const sequelize = require('sequelize');

exports.countProject = (userId) => new Promise((async (resolve, reject) => {
    try {
        resolve(await Models.Project.count({
            where: {user: userId}
        }));
    } catch (e) {
        reject(e);
    }
}));

exports.countOnGoingProject = (userId) => new Promise((async (resolve, reject) => {
    try {
        resolve(await Models.Project.count({
            where: {
                [op.and]: [
                    { user: userId },
                    { status: 'en_cours' },
                ],
            }
        }));
    } catch (e) {
        reject(e);
    }
}));

exports.getTurnover = (userId) => new Promise((async (resolve, reject) => {
    try {
        resolve(await Models.Project.findAll({
            attributes: [[sequelize.fn('sum', sequelize.col('amount')), 'total']],
            where: { user: userId },
        }));
    } catch (e) {
        reject(e);
    }
}));

exports.getAverageHourlyRate = (userId) => new Promise((async (resolve, reject) => {
    try {
        resolve(await Models.Project.findAll({
            attributes: [[sequelize.fn('avg', sequelize.col('adr')), 'averageHourlyRate']],
            where: { user: userId },
        }));
    } catch (e) {
        reject(e);
    }
}));
