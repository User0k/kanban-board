const express = require('express');
const router = express.Router();
const boardRouter = require('./boardRouter');
const columnRouter = require('./columnRouter');
const taskRouter = require('./taskRouter');
const reorderRouter = require('./reorderRouter');

columnRouter.use('/:ColumnId/tasks', taskRouter);
boardRouter.use('/:BoardId/columns', columnRouter);
boardRouter.use('/:BoardId/reorder', reorderRouter);
router.use('/boards', boardRouter);

module.exports = router;
