const express = require('express');
const router = express.Router();
const {
  addColumn,
  getColumns,
  getColumnById,
  updateColumnByID,
  deleteColumnById,
  reorderColumns,
} = require('../controllers/columnController');

router.post('/', addColumn);
router.get('/', getColumns);
router.get('/:id', getColumnById);
router.put('/:id', updateColumnByID);
router.delete('/:id', deleteColumnById);
router.put('/:id/reorder', reorderColumns);

module.exports = router;
