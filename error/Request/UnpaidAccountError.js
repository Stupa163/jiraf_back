class UnpaidAccountError extends Error {
    constructor() {
        super('You can unlock full access by buying our product');
    }
}

module.exports = UnpaidAccountError;
