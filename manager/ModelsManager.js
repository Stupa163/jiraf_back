const MissingFieldError = require('../error/Request/MissingFieldError.js');

exports.instanciateModelFromRequest = (model, req) => new Promise((resolve) => {
    let object = new model();
    Object.keys(model.rawAttributes).forEach((key) => {
        if (!model.rawAttributes[key].isImmutable) {
            if (Object.prototype.hasOwnProperty.call(req, key)) {
                object[key] = req[key];
            } else {
                throw new MissingFieldError(key);
            }
        }
    });
    resolve(object);
});

exports.updateModelFromRequest = (model, req) => new Promise((resolve) => {
    Object.keys(model.rawAttributes).forEach((key) => {
        if (!model.rawAttributes[key].isImmutable) {
            if (Object.prototype.hasOwnProperty.call(req, key)) {
                model[key] = req[key];
            }
        }
    });
    resolve(model);
});
