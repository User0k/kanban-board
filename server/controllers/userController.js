const errorHandler = require('express-async-handler');
const colorizer = require('../helpers/nameToColor');
const { User } = require('../models');

const deleteUser = errorHandler(async (req, res) => {
  const { id } = req.params;
  const destroyed = await User.destroy({ where: { id } });

  if (destroyed === 1) {
    res.clearCookie('refreshToken');
    res.status(200);
    return res.json({ message: 'User has been deleted' });
  }

  res.status(404);
  throw new Error('User not found');
});

const updateUserName = errorHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.status(401);
    throw new Error('User must contian a name');
  }

  const color = colorizer(name);

  await User.update({ name, color }, { where: { id } });
  res.status(200);
  return res.json({ message: 'User has been updated' });
});

const getAllUsers = errorHandler(async (req, res) => {
  const users = await User.findAll({ order: [['name', 'ASC']] });

  if (!users) {
    res.status(404);
    throw new Error('Users not found');
  }

  res.status(200);
  return res.json(users);
});

const getUser = errorHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200);
  return res.json({ user });
});

module.exports = {
  deleteUser,
  updateUserName,
  getAllUsers,
  getUser,
};
