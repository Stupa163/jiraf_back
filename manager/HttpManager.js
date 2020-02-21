const MissingFieldError = require('../error/Request/MissingFieldError');

const UNKNOW_ERROR = 'unknow_error';

exports.renderError = (res, error, code = 400) => {
  res.status(code).json({ status: 'error', error: error.message || UNKNOW_ERROR });
};

exports.renderSuccess = (res, additionalFields, code = 200) => {
  res.status(code).json({ status: 'ok', ...additionalFields });
};

exports.hasRequiredFields = (body, ...requiredFields) => {
  Object.values(requiredFields).forEach((value) => {
    if (!Object.prototype.hasOwnProperty.call(body, value)) {
      throw new MissingFieldError(value);
    }
  });
};
