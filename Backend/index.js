const express = require('express');
const cors = require('cors');
const path = require('path');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const DB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/userModel');
const { Forecast, initForecastModel } = require('./models/forecastModel');
const forecastRoutes = require('./routes/forecastRoutes');

const app = express();
const port = process.env.SERVER_PORT || 3000;
const corsOptions = {
  origin: ['http://localhost:5173'],
  methods: 'GET, POST, PUT, DELETE, PATCH',
  credentials: true,
  optionsSuccessStatus: 200,
};

const startServer = async () => {
  await DB.connect();
  User.initUserModel();
  initForecastModel();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`.yellow.bold);
  });
};

app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(authRoutes);
app.use('/api', forecastRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

startServer();
