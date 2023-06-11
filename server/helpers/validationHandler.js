const { validationResult } = require('express-validator');

const validationFields = {
  email: 'Should be a valid e-mail ',
  password: 'Password should contain  from 6 to 32 characters ',
  name: 'Name should contain  from 1 to 32 characters ',
};

const validationHandler = (req) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    let res = '';
    validationErrors
      .array()
      .forEach((err) => (res += validationFields[err.path]));
    return res;
  }
};

module.exports = validationHandler;
