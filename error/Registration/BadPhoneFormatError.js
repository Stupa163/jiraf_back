class BadPhoneFormatError extends Error {
    constructor() {
        super('The Phone number inst\' correctly formated, pleasure it is written as followed +33[NUMBER].');
    }
}

module.exports = BadPhoneFormatError;
