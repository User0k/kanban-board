const errorHandler = require('express-async-handler');
const { Board, Task, User } = require('../models');

const addBoard = errorHandler(async (req, res) => {
  const { name, description, image } = req.body;

  if (!name || !description || !image) {
    res.status(400);
    throw new Error('Board must contain name, description and image');
  }

  const board = await Board.create({ image, name, description });
  res.status(201);
  return res.json(board);
});

const getAllBoards = errorHandler(async (req, res) => {
  const boards = await Board.findAll({ order: [['createdAt', 'DESC']] });
  return res.json(boards);
});

const getBoardById = errorHandler(async (req, res) => {
  const { id } = req.params;
  const board = await Board.findOne({ where: { id } });

  if (board) {
    return res.json(board);
  }

  res.status(404);
  throw new Error('Board not found');
});

const getTasksInBoard = errorHandler(async (req, res) => {
  const tasks = await Task.findAll({
    where: { BoardId: req.params.id },
    include: [
      {
        model: User,
        through: { attributes: [] },
      },
    ],
    order: [['order', 'ASC']],
  });

  if (tasks) {
    const groupedTasks = tasks.reduce((acc, task) => {
      if (!acc[task.ColumnId]) {
        acc[task.ColumnId] = [task];
      } else {
        acc[task.ColumnId].push(task);
      }

      return acc;
    }, {});

    return res.json(groupedTasks);
  }

  res.status(404);
  throw new Error('Tasks not found');
});

const updateBoard = errorHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, image } = req.body;

  if (!name || !description || !image) {
    res.status(400);
    throw new Error('Board must contain name, description and image');
  }

  await Board.update({ name, description, image }, { where: { id } });
  res.status(200);
  return res.json({ message: 'Board has been updated' });
});

const deleteBoardById = errorHandler(async (req, res) => {
  const { id } = req.params;
  const destroyed = await Board.destroy({ where: { id } });

  if (destroyed === 1) {
    res.status(200);
    return res.json({ message: 'Board has been deleted' });
  }

  res.status(404);
  throw new Error('Board not found');
});

module.exports = {
  addBoard,
  getAllBoards,
  getBoardById,
  getTasksInBoard,
  updateBoard,
  deleteBoardById,
};
