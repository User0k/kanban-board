const { Op } = require('sequelize');
const errorHandler = require('express-async-handler');
const { Task } = require('../models');

const addTask = errorHandler(async (req, res) => {
  const { title, description, ColumnId } = req.body;

  if (!title || !ColumnId) {
    res.status(400);
    throw new Error('Task must contain title and ColumnId');
  }

  const order = (await Task.count({ where: { ColumnId } })) + 1;
  const task = await Task.create({ title, description, ColumnId, order });
  res.status(201);
  return res.json(task);
});

const getTasks = errorHandler(async (req, res) => {
  const { ColumnId } = req.body;

  const tasks = !ColumnId
    ? await Task.findAll()
    : await Task.findAll({ where: { ColumnId } });

  return res.json(tasks);
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

module.exports = {
  addTask,
  getTasks,
  getTaskById,
  updateTaskByID,
  deleteTaskById,
};
