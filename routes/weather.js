var SECRETS = require('../secrets.js');
var ForecastIo = require('forecastio');
var forecastIo = new ForecastIo(SECRETS.FORECAST_API_KEY);

// get the current weather summary from forecast.io
getWeather = function (req, res) {
	var params = req.params;

	forecastIo.forecast(params.latitude, params.longitude, {exclude: 'minutely,hourly,daily,alerts,flags'}).then(function (data) {
		res.send(JSON.stringify(data.currently.icon));
	});
}

module.exports.getWeather = getWeather;