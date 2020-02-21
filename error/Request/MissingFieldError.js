class MissingFieldError extends Error {
    constructor(field) {
        super(`missing_field_${field}`);
    }
}

module.exports = MissingFieldError;
