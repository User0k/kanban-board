const express = require('express');
const boardRouter = express.Router();
const {
  addBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
  deleteBoardById,
} = require('../controllers/boardController');

boardRouter.post('/', addBoard);
boardRouter.get('/', getAllBoards);
boardRouter.get('/:id', getBoardById);
boardRouter.put('/:id', updateBoard);
boardRouter.delete('/:id', deleteBoardById);

module.exports = boardRouter;
