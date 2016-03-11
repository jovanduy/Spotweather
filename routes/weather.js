var request = require(request);

var SECRETS = require('../secrets.js');
var ForecastIo = require('forecastio');
var forecastIo = new ForecastIo(SECRETS.FORECAST_API_KEY);

var routes = {};

var playlistMap = {
	clear-day: '1KuPMhQ4z7oIq3zdQEZP0V',
	clear-night: '2qlMTcW6AnnaGl7eXWAZP5',
	rain: '7CQunpJEHecknIyABfS8pP',
	snow: '4WCmHOBqKS7pac4s1lW2ZY',
	sleet: '2uIgi9q0HmyhRj9gRRb5D7',
	wind: '5uyhBdXXU45smNFcfHPtgp',
	fog: '7CQunpJEHecknIyABfS8pP',
	partly-cloudy-day: '3AJqvBUq4hATinoGPTMLeg',
	partly-cloudy-night: '3ewAapAmERO3sW4cp89xk9'
}

// get the current weather summary from forecast.io
routes.getWeather = function (req, res) {
	var params = req.params;

	forecastIo.forecast(params.latitude, params.longitude, {exclude: 'minutely,hourly,daily,alerts,flags'}).then(function (data) {
		res.send((data.currently.icon));
	});
}

routes.weatherPlaylist = function (req, res) {

	request('https://api.spotify.com/v1/users/' + req.user.id + '/playlists/' + playlistMap[req.params.weather] + '?fields=external_urls.spotify', function (err, response, body) {
		if (!err) {
			console.log(body);
		} else {
			res.json(err);
		}
	});

}

module.exports = routes;