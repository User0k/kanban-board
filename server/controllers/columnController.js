const { Op } = require('sequelize');
const errorHandler = require('express-async-handler');
const { Column } = require('../models');

const addColumn = errorHandler(async (req, res) => {
  const { title, BoardId } = req.body;

  if (!title || !BoardId) {
    res.status(400);
    throw new Error('Column must contain title and BoardId');
  }

  const order = (await Column.count({ where: { BoardId } })) + 1;
  const column = await Column.create({ title, BoardId, order });
  res.status(201);
  return res.json(column);
});

const getColumns = errorHandler(async (req, res) => {
  const { BoardId } = req.body;

  const columns = !BoardId
    ? await Column.findAll()
    : await Column.findAll({ where: { BoardId } });

  return res.json(columns);
});

const getColumnById = errorHandler(async (req, res) => {
  const { id } = req.params;
  const column = await Column.findOne({ where: { id } });

  if (column) {
    return res.json(column);
  }

  res.status(404);
  throw new Error('Column not found');
});

const updateColumnByID = errorHandler(async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title || !id) {
    res.status(400);
    throw new Error('Column must contain title and id');
  }

  await Column.update({ title }, { where: { id } });
  res.status(200);
  return res.json({ message: 'Column has been updated' });
});

const reorderColumns = errorHandler(async (req, res) => {
  const { id } = req.params;
  const { targetOrder } = req.body;

  if (!targetOrder) {
    res.status(400);
    throw new Error('Column must contain targetOrder');
  }

  const column = await Column.findOne({ where: { id } });

  if (!column) {
    res.status(404);
    throw new Error('Column not found');
  }

  const { order, BoardId } = column.dataValues;
  if (order < targetOrder) {
    const columns = await Column.findAll({
      where: {
        BoardId,
        order: { [Op.between]: [order + 1, targetOrder] },
      },
    });
    columns.forEach(col => col.update({ order: col.dataValues.order - 1 }));
  } else {
    const columns = await Column.findAll({
      where: {
        BoardId,
        order: { [Op.between]: [targetOrder, order - 1] },
      },
    });
    columns.forEach(col => col.update({ order: col.dataValues.order + 1 }));
  }

  await column.update({ order: targetOrder });
  res.status(200);
  return res.json({ message: 'Columns has been reordered' });
});

const deleteColumnById = errorHandler(async (req, res) => {
  const { id } = req.params;
  const column = await Column.findOne({ where: { id } });

  if (!column) {
    res.status(404);
    throw new Error('Column not found');
  }

  const destroyed = await Column.destroy({ where: { id } });

  if (destroyed === 1) {
    const { BoardId, order } = column.dataValues;
    const cols = await Column.findAll({
      where: {
        BoardId,
        order: { [Op.gt]: order },
      },
    });
    const newOrders = cols.map((col) => col?.dataValues.order - 1);
    cols.forEach((col, i) => col.update({ order: newOrders[i] }));
    res.status(200);
    return res.json({ message: 'Column has been deleted' });
  }

  res.status(503);
  throw new Error('Column is not deleted. Try again');
});

module.exports = {
  addColumn,
  getColumns,
  getColumnById,
  updateColumnByID,
  deleteColumnById,
  reorderColumns,
};
