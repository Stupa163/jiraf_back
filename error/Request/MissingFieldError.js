class MissingFieldError extends Error {
    constructor(field) {
        super(`Missing field ${field}`);
    }
}

module.exports = MissingFieldError;
