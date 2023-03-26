const errorHandler = require('express-async-handler');
const { Board } = require('../models');

const addBoard = errorHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    res.status(400);
    throw new Error('Board must contain name and description');
  }

  const board = await Board.create({ name, description });
  res.status(201);
  return res.json(board);
});

const getAllBoards = errorHandler(async (req, res) => {
  const boards = await Board.findAll();
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

const updateBoard = errorHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Board must contain a name');
  }

  if (!description) {
    res.status(400);
    throw new Error('Board must contain a description');
  }

  await Board.update({ name, description }, { where: { id } });
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
  updateBoard,
  deleteBoardById,
};
