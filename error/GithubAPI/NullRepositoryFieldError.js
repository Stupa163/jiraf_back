class NullRepositoryFieldError extends Error {
    constructor() {
        super('The project is not linked to any github repository');
    }
}

module.exports = NullRepositoryFieldError;
