var SECRETS = require('../secrets.js');
var ForecastIo = require('forecastio');
var forecastIo = new ForecastIo(SECRETS.FORECAST_API_KEY);

getWeather = function (req, res) {
	var latitude = req.params.latitude;
	var longitude = req.params.longitude;

	forecastIo.forecast(latitude, longitude, {exclude: 'minutely,hourly,daily,alerts,flags'}).then(function (data) {
		res.send(data.currently.icon);
	});
}

module.exports.getWeather = getWeather;
