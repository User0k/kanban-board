const { validationResult } = require('express-validator');

const validationFields = {
  email: 'Should be a valid e-mail',
  password: 'Password should contain from 6 to 32 characters',
  name: 'Name should contain from 1 to 32 characters',
};

const validationHandler = (req) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return validationErrors
      .array()
      .map((err) => validationFields[err.path])
      .join(', ');
  }
};

module.exports = validationHandler;
