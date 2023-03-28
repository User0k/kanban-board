const express = require('express');
const columnRouter = express.Router({ mergeParams: true });
const {
  addColumn,
  getColumns,
  getColumnById,
  updateColumnByID,
  deleteColumnById,
  reorderColumns,
} = require('../controllers/columnController');

columnRouter.post('/', addColumn);
columnRouter.get('/', getColumns);
columnRouter.get('/:id', getColumnById);
columnRouter.put('/:id', updateColumnByID);
columnRouter.delete('/:id', deleteColumnById);
columnRouter.put('/:id/reorder', reorderColumns);

module.exports = columnRouter;
