const express = require('express');
const boardRouter = express.Router();
const {
  addBoard,
  getAllBoards,
  getBoardById,
  getTasksInBoard,
  updateBoard,
  deleteBoardById,
} = require('../controllers/boardController');

boardRouter.post('/', addBoard);
boardRouter.get('/', getAllBoards);
boardRouter.get('/:id', getBoardById);
boardRouter.get('/:id/tasks', getTasksInBoard);
boardRouter.put('/:id', updateBoard);
boardRouter.delete('/:id', deleteBoardById);

module.exports = boardRouter;
