const express = require('express');
const router = express.Router();
const boardRouter = require('./boardRouter');
const columnRouter = require('./columnRouter');
const taskRouter = require('./taskRouter');
const reorderRouter = require('./reorderRouter');
const userRouter = require('./userRouter');
const authRouter = require('./authRouter');

columnRouter.use('/:ColumnId/tasks', taskRouter);
boardRouter.use('/:BoardId/columns', columnRouter);
boardRouter.use('/:BoardId/reorder', reorderRouter);
router.use('/boards', boardRouter);
router.use('/users', userRouter);
router.use('/', authRouter);

module.exports = router;
