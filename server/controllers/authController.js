const errorHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const tokenGenerator = require('../helpers/tokenGenerator');
const cookieSetter = require('../helpers/cookieSetter');
const { validationHandler } = require('../helpers/validationTools');
const colorizer = require('../helpers/nameToColor');
const userAttrFilterer = require('../helpers/userAttrFilterer');
const { User } = require('../models');

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
  const color = colorizer(name);
  cookieSetter(res, 'refreshToken', refreshToken);

  try {
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      color,
      refreshToken,
    });

    res.status(201);
    return res.json({ accessToken, user: userAttrFilterer(user.get()) });
  } catch (error) {
    res.status(409);
    throw new Error(error?.erros?.message);
  }
});

const login = errorHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    res.status(422);
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
  cookieSetter(res, 'refreshToken', refreshToken);

  res.status(200);
  return res.json({ accessToken, user: userAttrFilterer(user.get()) });
});

const logout = errorHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  res.clearCookie('refreshToken');
  await User.update({ refreshToken: null }, { where: { refreshToken } });

  res.status(200);
  return res.json({ message: 'User has been logouted' });
});

const refresh = errorHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    res.status(401);
    throw new Error('No refresh token found');
  }

  try {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
    const user = await User.findOne({ where: { refreshToken } });

    if (!user) {
      res.status(401);
      throw new Error('No user found');
    }

    const { accessToken } = tokenGenerator({ email: user.dataValues.email });
    await user.update({ refreshToken: tokens.refreshToken });

    res.status(201);
    return res.json({
      accessToken,
      user: userAttrFilterer(user.get()),
    });
  } catch (error) {
    res.status(401);
    throw new Error('Invalid or expired refresh token');
  }
});

const checkAuth = errorHandler(async (req, res) => {
  const header = req.headers?.authorization.split(' ');

  if (header[0] !== 'Bearer' || !header[1]) {
    res.status(401);
    throw new Error('No access token found');
  }

  try {
    jwt.verify(header[1], process.env.JWT_ACCESS_KEY);
    return res.json('Access token is correct');
  } catch (error) {
    res.status(401);
    throw new Error('Invalid or expired access token');
  }
});

module.exports = {
  register,
  login,
  logout,
  refresh,
  checkAuth,
};
