class ModelNotFoundError extends Error {
  constructor(modelName) {
    super(`${modelName}_not_found`);
  }
}

module.exports = ModelNotFoundError;
