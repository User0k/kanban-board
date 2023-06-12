const errorHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
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

const login = errorHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    res.status(404);
    throw new Error('User with this email not found');
  }

  const isCorrectPassword = await bcrypt.compare(
    password,
    user.dataValues.password
  );

  if (!isCorrectPassword) {
    res.status(401);
    throw new Error('The password is incorrect');
  }

  const { accessToken, refreshToken } = tokenGenerator({ email });
  await user.update({ refreshToken });

  res.cookie('refreshToken', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  res.status(200);
  return res.json({ accessToken, user });
});

const logout = errorHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  res.clearCookie('refreshToken');
  await User.update({ refreshToken: null }, { where: { refreshToken } });

  res.status(200);
  return res.json('User has been logouted');
});

const refresh = errorHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  const isCorrectToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
  const user = await User.findOne({ where: { refreshToken } });

  if (!isCorrectToken || !user) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  const tokens = tokenGenerator({ email: user.dataValues.email });
  res.cookie('refreshToken', tokens.refreshToken);
  await user.update({ refreshToken: tokens.refreshToken });
  res.status(201);
  return res.json({ accessToken: tokens.accessToken, user });
});

module.exports = { register, login, logout, refresh };
