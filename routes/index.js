const express = require('express');
const router = express.Router();
const boardRouter = require('./boardRouter');

router.use('/boards', boardRouter);

module.exports = router;
