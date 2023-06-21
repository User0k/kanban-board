const express = require('express');
const taskRouter = express.Router({ mergeParams: true });
const {
  addTask,
  getTasksInColumn,
  getTaskById,
  updateTaskByID,
  deleteTaskById,
  assignUser,
  unassignUser,
} = require('../controllers/taskController');

taskRouter.post('/', addTask);
taskRouter.get('/', getTasksInColumn);
taskRouter.get('/:id', getTaskById);
taskRouter.put('/:id', updateTaskByID);
taskRouter.delete('/:id', deleteTaskById);
taskRouter.post('/:id/assign', assignUser);
taskRouter.delete('/:id/assign', unassignUser);

module.exports = taskRouter;
