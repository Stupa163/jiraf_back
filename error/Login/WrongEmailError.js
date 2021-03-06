class WrongEmailError extends Error {
    constructor() {
        super('This email address could not be found. Please, try check if you typed it correctly.');
    }
}

module.exports = WrongEmailError;
