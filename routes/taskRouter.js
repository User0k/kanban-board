const express = require('express');
const {
  addTask,
  getTasks,
  getTaskById,
  updateTaskByID,
  deleteTaskById,
} = require('../controllers/taskController');
const router = express.Router();

router.post('/', addTask);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTaskByID);
router.delete('/:id', deleteTaskById);

module.exports = router;
