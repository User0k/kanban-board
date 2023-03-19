const express = require('express');
const router = express.Router();
const boardRouter = require('./boardRouter');
const columnRouter = require('./columnRouter');

router.use('/boards', boardRouter);
router.use('/columns', columnRouter);
module.exports = router;
