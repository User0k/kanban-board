const express = require('express');
const userRouter = express.Router();
const { body } = require('express-validator');
const {
  register,
  login,
  logout,
  refresh,
} = require('../controllers/userController');

userRouter.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6, max: 32 }),
  body('name').isLength({ min: 1, max: 32 }),
  register
);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.get('/refresh', refresh);

module.exports = userRouter;
