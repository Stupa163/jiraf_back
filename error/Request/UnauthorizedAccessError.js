class UnauthorizedAccessError extends Error {
    constructor() {
        super('access_forbiden');
    }
}

module.exports = UnauthorizedAccessError;
