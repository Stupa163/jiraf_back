class TooManyRequestError extends Error {
    constructor() {
        super('Too many request');
    }
}

module.exports = TooManyRequestError;
