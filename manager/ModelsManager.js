const MissingFieldError = require('../error/Request/MissingFieldError.js');

exports.instanciateModelFromRequest = (Model, req) => new Promise((resolve) => {
    const object = new Model();
    Object.keys(Model.rawAttributes).forEach((key) => {
        if (!Model.rawAttributes[key].isImmutable) {
            if (Object.prototype.hasOwnProperty.call(req, key)) {
                object[key] = req[key];
            } else if (!Model.rawAttributes[key].allowNull) {
                throw new MissingFieldError(key);
            }
        }
    });
    resolve(object);
});

exports.updateModelFromRequest = (model, req) => new Promise((resolve) => {
    const clonedModel = model;
    Object.keys(clonedModel.rawAttributes).forEach((key) => {
        if (!clonedModel.rawAttributes[key].isImmutable) {
            if (Object.prototype.hasOwnProperty.call(req, key)) {
                clonedModel[key] = req[key];
            }
        }
    });
    resolve(clonedModel);
});
