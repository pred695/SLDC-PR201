// models/forecastModel.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Forecast = sequelize.define(
  'tpcodl_forecast',
  {
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true,
    },
    actual: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    predicted: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

const initForecastModel = async () => {
  try {
    await Forecast.sync({ alter: true });
    console.log('Forecast model is successfully synchronized.');
  } catch (err) {
    console.error('Unable to synchronize the forecast model:', err);
  }
};

module.exports = {
  Forecast,
  initForecastModel,
};
