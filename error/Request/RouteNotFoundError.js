class RouteNotFoundError extends Error {
    constructor(field) {
        super('The requested route could not be found');
    }
}

module.exports = RouteNotFoundError;
