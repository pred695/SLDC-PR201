const { Router } = require('express');
const { getForecastData } = require('../controllers/forecastController');

const router = Router();

router.get('/forecast', getForecastData);

module.exports = router;
