const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const PORT = process.env.PORT || 5000;
const app = express();
const router = require('./routes');
const cookieParser = require('cookie-parser');

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
  credentials: true
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

const init = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => console.log('server is running'));
  } catch (error) {
    console.error('Unable to connect to the database: ', error);
  }
};

init();
