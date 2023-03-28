const express = require('express');
const router = express.Router();
const boardRouter = require('./boardRouter');
const columnRouter = require('./columnRouter');
const taskRouter = require('./taskRouter');

columnRouter.use('/:ColumnId/tasks', taskRouter);
boardRouter.use('/:BoardId/columns', columnRouter);
router.use('/boards', boardRouter);

module.exports = router;
