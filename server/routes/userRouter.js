const express = require('express');
const userRouter = express.Router();
const { register } = require('../controllers/userController');
const { query } = require('express-validator');

userRouter.post(
  '/register',
  query('email').isEmail(),
  query('password').isLength({ min: 6, max: 32 }),
  query('name').isLength({ min: 1, max: 32 }),
  register
);

module.exports = userRouter;
