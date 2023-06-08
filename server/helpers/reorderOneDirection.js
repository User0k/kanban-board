const { Op } = require('sequelize');

const reorderOneDirection = async (model, parent, order, targetOrder) => {
  if (order < targetOrder) {
    const columns = await model.findAll({
      where: {
        ...parent,
        order: { [Op.between]: [order + 1, targetOrder] },
      },
    });
    columns.forEach((col) => col.update({ order: col.dataValues.order - 1 }));
  } else {
    const columns = await model.findAll({
      where: {
        ...parent,
        order: { [Op.between]: [targetOrder, order - 1] },
      },
    });
    columns.forEach((col) => col.update({ order: col.dataValues.order + 1 }));
  }
}

module.exports = {
  reorderOneDirection,
};
