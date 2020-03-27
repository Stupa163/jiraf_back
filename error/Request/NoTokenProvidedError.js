class NoTokenProvidedError extends Error {
    constructor() {
        super('No token provided');
    }
}

module.exports = NoTokenProvidedError;
