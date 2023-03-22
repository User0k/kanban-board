const express = require('express');
const router = express.Router();
const uesrRouter = require('./uesrRouter');
const boardRouter = require('./boardRouter');
const columnRouter = require('./columnRouter');
const taskRouter = require('./taskRouter');

router.use('/user', uesrRouter);
router.use('/boards', boardRouter);
router.use('/columns', columnRouter);
router.use('/tasks', taskRouter);

module.exports = router;
