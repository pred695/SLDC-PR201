// controllers/forecastController.js

const { Forecast } = require('../models/forecastModel');

const getForecastData = async (req, res) => {
  try {
    const forecasts = await Forecast.findAll();
    res.json(forecasts);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error retrieving forecast data', error: err.message });
  }
};

module.exports = {
  getForecastData,
};
