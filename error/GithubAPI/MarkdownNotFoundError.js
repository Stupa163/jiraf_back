class MarkdownNotFoundError extends Error {
    constructor() {
        super('The wedev.config file couldn\'t be found on the given repository');
    }
}

module.exports = MarkdownNotFoundError;
