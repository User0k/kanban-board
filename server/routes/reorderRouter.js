const express = require('express');
const reorderRouter = express.Router({ mergeParams: true });
const { reorderColumns } = require('../controllers/columnController');

reorderRouter.put('/columns/:id', reorderColumns);

module.exports = reorderRouter;
