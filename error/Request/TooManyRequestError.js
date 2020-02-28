class TooManyRequestError extends Error {
  constructor() {
    super('too_many_request');
  }
}

module.exports = TooManyRequestError;
