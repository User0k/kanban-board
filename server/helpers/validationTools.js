const { validationResult, body } = require('express-validator');

const validationFields = {
  email: 'Should be a valid e-mail',
  password: 'Password should contain from 6 to 32 characters',
  name: 'Name should contain from 1 to 32 characters',
};

const validateEmail = body('email').isEmail();
const validatePassword = body('password').isLength({ min: 6, max: 32 });
const validateName = body('name').isLength({ min: 1, max: 32 });

const validationHandler = (req) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return validationErrors
      .array()
      .map((err) => validationFields[err.path])
      .join(', ');
  }
};

module.exports = {
  validateEmail,
  validatePassword,
  validateName,
  validationHandler,
};
