const { Op } = require('sequelize');

const reorderOneDirection = async (model, parent, order, targetOrder) => {
  if (order < targetOrder) {
    const models = await model.findAll({
      where: {
        ...parent,
        order: { [Op.between]: [order + 1, targetOrder] },
      },
    });
    models.forEach((m) => m.update({ order: m.dataValues.order - 1 }));
  } else {
    const models = await model.findAll({
      where: {
        ...parent,
        order: { [Op.between]: [targetOrder, order - 1] },
      },
    });
    models.forEach((m) => m.update({ order: m.dataValues.order + 1 }));
  }
};

module.exports = {
  reorderOneDirection,
};
