const errorHandler = require('express-async-handler');
const colorizer = require('../helpers/nameToColor');
const { User, Task } = require('../models');

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

const assignUser = errorHandler(async (req, res) => {
  const { id } = req.params;
  const { taskId } = req.body;
  const user = await User.findByPk(id);

  if (!user) {
    res.status(404);
    throw new Error('User with this id not found');
  }

  const task = await Task.findByPk(taskId);

  if (!task) {
    res.status(404);
    throw new Error('Task with this id not found');
  }

  await user.addTask(taskId);
  await user.addBoard(task.dataValues.BoardId);
  await user.save();
  res.status(201);
  return res.json({ message: 'User has been assigned' });
});

const unassignUser = errorHandler(async (req, res) => {
  const { id } = req.params;
  const { taskId } = req.body;
  const user = await User.findByPk(id);

  if (!user) {
    res.status(404);
    throw new Error('User with this id not found');
  }

  const task = await Task.findByPk(taskId);

  if (!task) {
    res.status(404);
    throw new Error('Task with this id not found');
  }

  await user.removeTask(taskId);
  await user.removeBoard(task.dataValues.BoardId);
  await user.save();
  res.status(204);
  return res.json({ message: 'User has been unassigned' });
});

module.exports = {
  deleteUser,
  updateUserName,
  getAllUsers,
  getUser,
  assignUser,
  unassignUser,
};
