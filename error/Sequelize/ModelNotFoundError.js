class ModelNotFoundError extends Error {
    constructor(modelName) {
        super(`The ${modelName} could not be found`);
    }
}

module.exports = ModelNotFoundError;
