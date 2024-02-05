const { Sequelize } = require('sequelize');
require('dotenv').config({ path: '../.env' });

module.exports = new Sequelize(process.env.DATABASE_URL);
