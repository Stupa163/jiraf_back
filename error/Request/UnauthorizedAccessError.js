class UnauthorizedAccessError extends Error {
  constructor() {
    super('Access forbiden');
  }
}

module.exports = UnauthorizedAccessError;
