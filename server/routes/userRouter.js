const express = require('express');
const userRouter = express.Router();
const { body } = require('express-validator');
const { register } = require('../controllers/userController');

userRouter.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6, max: 32 }),
  body('name').isLength({ min: 1, max: 32 }),
  register
);

module.exports = userRouter;
