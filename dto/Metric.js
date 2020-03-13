module.exports = class Metric {
    constructor(projectCount, onGoingProjectsCount, turnover, averageHourlyRate) {
        this.projectCount = projectCount;
        this.onGoingProjectsCount = onGoingProjectsCount;
        this.turnover = turnover;
        this.averageHourlyRate = averageHourlyRate;
    }
};
