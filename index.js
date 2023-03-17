const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const PORT = process.env.PORT || 5000;
const app = express();
const router = require('./routes');

app.use(cors());
app.use(express.json());
app.use('/api', router);

const init = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log('server is running'));
  } catch (error) {
    console.error('Unable to connect to the database: ', error);
  }
};

init();
