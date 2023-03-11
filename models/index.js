const sequelize = require('../db');
const { DataTypes, fn } = require('sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: fn('uuid_generate_v4'),
    primaryKey: true,
  },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
});

const Board = sequelize.define('Board', {
  id: {
    type: DataTypes.UUID,
    defaultValue: fn('uuid_generate_v4'),
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
});

const Column = sequelize.define('Column', {
  id: {
    type: DataTypes.UUID,
    defaultValue: fn('uuid_generate_v4'),
    primaryKey: true,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  order: { type: DataTypes.INTEGER, autoIncrement: true },
});

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: fn('uuid_generate_v4'),
    primaryKey: true,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  order: { type: DataTypes.INTEGER, autoIncrement: true },
});

const UserToTask = sequelize.define('UserToTask', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});

Board.hasMany(Column);
Column.belongsTo(Board);

Column.hasMany(Task);
Task.belongsTo(Column);

User.belongsToMany(Task, { through: UserToTask });
Task.belongsToMany(User, { through: UserToTask });

module.exports = {
  User,
  Board,
  Column,
  Task,
};
