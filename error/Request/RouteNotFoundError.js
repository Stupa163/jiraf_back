class RouteNotFoundError extends Error {
    constructor() {
        super('The requested route could not be found');
    }
}

module.exports = RouteNotFoundError;
