const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const PORT = process.env.PORT || 5000;
const app = express();
const router = require('./routes');
const cookieParser = require('cookie-parser');

const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

const init = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

    if (process.env.MODE === 'production') {
      const path = require('path');
      app.use(express.static(path.join(__dirname, '../client/dist')));
      const clientIndex = path.join(__dirname, '../client/dist', 'index.html');
      app.get('*', (_, res) => res.sendFile(clientIndex));
    } else {
      app.get('/', (_, res) => res.send('Connected to server'));
    }
  } catch (error) {
    console.error('Unable to connect to the database: ', error);
  }
};

init();
