const express = require('express');
const authRouter = express.Router();
const { body } = require('express-validator');
const {
  register,
  login,
  logout,
  refresh,
} = require('../controllers/authController');

authRouter.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6, max: 32 }),
  body('name').isLength({ min: 1, max: 32 }),
  register
);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/refresh', refresh);

module.exports = authRouter;
