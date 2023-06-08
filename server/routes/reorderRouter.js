const express = require('express');
const reorderRouter = express.Router({ mergeParams: true });
const { reorderColumns } = require('../controllers/columnController');
const { reorderTasks } = require('../controllers/taskController');

reorderRouter.put('/columns/:id', reorderColumns);
reorderRouter.put('/columns/:columnId/tasks/:id', reorderTasks);

module.exports = reorderRouter;
