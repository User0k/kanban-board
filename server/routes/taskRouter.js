const express = require('express');
const taskRouter = express.Router({ mergeParams: true });
const {
  addTask,
  getTasks,
  getTaskById,
  updateTaskByID,
  deleteTaskById,
} = require('../controllers/taskController');

taskRouter.post('/', addTask);
taskRouter.get('/', getTasks);
taskRouter.get('/:id', getTaskById);
taskRouter.put('/:id', updateTaskByID);
taskRouter.delete('/:id', deleteTaskById);

module.exports = taskRouter;
