const errorHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const tokenGenerator = require('../helpers/tokenGenerator');
const validationHandler = require('../helpers/validationHandler');

const register = errorHandler(async (req, res) => {
  const { email, password, name } = req.body;
  const validationErrorMsg = validationHandler(req);

  if (validationErrorMsg) {
    res.status(400);
    throw new Error(validationErrorMsg);
  }

  const existedUser = await User.findOne({ where: { email } });

  if (existedUser) {
    res.status(403);
    throw new Error('User with this email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const { accessToken, refreshToken } = tokenGenerator({ email });
  res.cookie('refreshToken', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  const user = await User.create({
    email,
    password: hashedPassword,
    name,
    refreshToken,
  });

  res.status(201);
  return res.json({ accessToken, user });
});

module.exports = { register };
