const { Op } = require('sequelize');
const errorHandler = require('express-async-handler');
const colorizer = require('../helpers/nameToColor');
const { User, Task, UserToTask } = require('../models');

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

const getUsersByIds = errorHandler(async (req, res) => {
  const { ids } = req.body;
  const users = await User.findAll({
    where: {
      id: {
        [Op.in]: ids,
      },
    },
  });

  res.status(200);
  return res.json({ users });
});

const getUsersInTasks = errorHandler(async (req, res) => {
  const { taskIds } = req.body;

  if (!Array.isArray(taskIds)) {
    res.status(400);
    throw new Error('Must contain a valid array of task ids');
  }

  const uniqueUsers = {};
  const usersInTasks = {};

  await Promise.all(
    taskIds.map(async (taskId) => {
      const usersToTasks = await UserToTask.findAll({
        where: { TaskId: taskId },
        attributes: ['UserId'],
      });

      if (usersToTasks.length) {
        const taskUsers = await Promise.all(
          usersToTasks.map(async (model) => {
            let user = uniqueUsers[model.UserId];

            if (user) {
              return user;
            }

            user = await User.findOne({
              where: { id: model.UserId },
              attributes: ['id', 'name', 'color'],
            });
            uniqueUsers[model.UserId] = user;
            return user;
          })
        );

        usersInTasks[taskId] = taskUsers;
      }
    })
  );

  res.status(200);
  return res.json(usersInTasks);
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

  await task.addUser(user);
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

  await task.removeUser(user);
  res.status(204);
  return res.json({ message: 'User has been unassigned' });
});

module.exports = {
  deleteUser,
  updateUserName,
  getAllUsers,
  getUsersInTasks,
  getUsersByIds,
  getUser,
  assignUser,
  unassignUser,
};
