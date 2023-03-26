const express = require('express');
const router = express.Router();
const {
  addBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
  deleteBoardById,
} = require('../controllers/boardController');

router.post('/', addBoard);
router.get('/', getAllBoards);
router.get('/:id', getBoardById);
router.put('/:id', updateBoard);
router.delete('/:id', deleteBoardById);

module.exports = router;
