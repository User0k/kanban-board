const express = require('express');
const authRouter = express.Router();
const {
  validateEmail,
  validatePassword,
  validateName,
} = require('../helpers/validationTools');
const {
  register,
  login,
  logout,
  refresh,
  checkAuth,
} = require('../controllers/authController');

authRouter.post(
  '/register',
  validateEmail,
  validatePassword,
  validateName,
  register
);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/refresh', refresh);
authRouter.get('/checkAuth', checkAuth);

module.exports = authRouter;
