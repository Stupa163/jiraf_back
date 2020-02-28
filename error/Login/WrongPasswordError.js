class WrongPasswordError extends Error {
  constructor() {
    super('You typed a wrong password. Please try again.');
  }
}

module.exports = WrongPasswordError;
