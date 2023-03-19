const express = require('express');
const router = express.Router();
const {
  addColumn,
  getColumnById,
  updateColumnByID,
  deleteColumnById,
  getColumns,
} = require('../controllers/columnController');

router.post('/', addColumn);
router.get('/', getColumns);
router.get('/:id', getColumnById);
router.put('/:id', updateColumnByID);
router.delete('/:id', deleteColumnById);

module.exports = router;
