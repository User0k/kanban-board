const express = require('express');
const sequelize = require('./db');
const PORT = process.env.PORT || 5000;
const app = express();

const init = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log('server is running'));
  } catch (error) {
    console.error('Unable to connect to the database:');
  }
};

init();
