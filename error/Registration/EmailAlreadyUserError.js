class EmailAlreadyUserError extends Error {
    constructor() {
        super('This email address is already used. Please use another one.');
    }
}

module.exports = EmailAlreadyUserError;
