class WrongPasswordError extends Error {
  constructor() {
    super('You entered a wrong password. Please try again.');
  }
}

module.exports = WrongPasswordError;
