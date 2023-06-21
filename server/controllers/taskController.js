const { Op } = require('sequelize');
const errorHandler = require('express-async-handler');
const { Task, User } = require('../models');
const { reorderOneDirection } = require('../helpers/reorderOneDirection');

const addTask = errorHandler(async (req, res) => {
  const { title, description } = req.body;
  const { BoardId, ColumnId } = req.params;

  if (!title || !BoardId || !ColumnId) {
    res.status(400);
    throw new Error('Task must contain title, BoardId and ColumnId');
  }

  const order = (await Task.count({ where: { ColumnId } })) + 1;
  const task = await Task.create({
    title,
    description,
    BoardId,
    ColumnId,
    order,
  });
  res.status(201);
  return res.json(task);
});

const getTasksInColumn = errorHandler(async (req, res) => {
  const { ColumnId } = req.params;
  const tasks = await Task.findAll({
    where: { ColumnId },
    order: [['order', 'ASC']],
  });

  if (tasks) {
    return res.json(tasks);
  }

  res.status(404);
  throw new Error('Tasks not found');
});

const getTaskById = errorHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOne({ where: { id } });

  if (task) {
    return res.json(task);
  }

  res.status(404);
  throw new Error('Task not found');
});

const updateTaskByID = errorHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title || !id) {
    res.status(400);
    throw new Error('Task must contain title and id');
  }

  await Task.update({ title, description }, { where: { id } });
  res.status(200);
  return res.json({ message: 'Task has been updated' });
});

const reorderTasks = errorHandler(async (req, res) => {
  const { columnId, id } = req.params;
  const { targetOrder, targetColumnId } = req.body;

  if (!targetOrder) {
    res.status(400);
    throw new Error('Task must contain targetOrder');
  }

  const task = await Task.findOne({ where: { id } });

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  const { order } = task.dataValues;

  if (!targetColumnId) {
    await reorderOneDirection(Task, { ColumnId: columnId }, order, targetOrder);
    await task.update({ order: targetOrder });
    return res.json({ message: 'Tasks has been reordered' });
  }

  const shiftOrderTasks = await Task.findAll({
    where: {
      ColumnId: columnId,
      order: { [Op.gt]: order },
    },
  });

  const unshiftOrderTasks = await Task.findAll({
    where: {
      ColumnId: columnId,
      order: { [Op.gte]: targetOrder },
    },
  });

  shiftOrderTasks.forEach((task) =>
    task.update({ order: task.dataValues.order - 1 })
  );

  unshiftOrderTasks.forEach((task) =>
    task.update({ order: task.dataValues.order + 1 })
  );

  await task.update({ order: targetOrder, ColumnId: targetColumnId });
  res.status(200);
  return res.json({ message: 'Tasks has been reordered' });
});

const deleteTaskById = errorHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOne({ where: { id } });

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  const destroyed = await Task.destroy({ where: { id } });

  if (destroyed === 1) {
    const { ColumnId, order } = task.dataValues;
    const tasks = await Task.findAll({
      where: {
        ColumnId,
        order: { [Op.gt]: order },
      },
    });
    const newOrders = tasks.map((task) => task?.dataValues.order - 1);
    tasks.forEach((task, i) => task.update({ order: newOrders[i] }));
    res.status(200);
    return res.json({ message: 'Task has been deleted' });
  }

  res.status(404);
  throw new Error('Task not found');
});

const assignUser = errorHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const user = await User.findByPk(userId);

  if (!user) {
    res.status(404);
    throw new Error('User with this id not found');
  }

  await user.addTask(id);
  await user.save();
  res.status(201);
  return res.json({ message: 'User has been assigned' });
});

const unassignUser = errorHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const user = await User.findByPk(userId);

  if (!user) {
    res.status(404);
    throw new Error('User with this id not found');
  }

  await user.removeTask(id);
  await user.save();
  res.status(204);
  return res.json({ message: 'User has been unassigned' });
});

module.exports = {
  addTask,
  getTasksInColumn,
  getTaskById,
  updateTaskByID,
  reorderTasks,
  deleteTaskById,
  assignUser,
  unassignUser,
};
