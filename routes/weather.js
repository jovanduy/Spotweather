var request = require('request');

// var SECRETS = require('../secrets.js');
var ForecastIo = require('forecastio');
var forecastIo = new ForecastIo(process.env.FORECAST_API_KEY);

var routes = {};

var playlistMap = {
	'clear-day': '1KuPMhQ4z7oIq3zdQEZP0V',
	'clear-night': '2qlMTcW6AnnaGl7eXWAZP5',
	'rain': '7CQunpJEHecknIyABfS8pP',
	'fog': '7CQunpJEHecknIyABfS8pP',
	'snow': '4WCmHOBqKS7pac4s1lW2ZY',
	'sleet': '4WCmHOBqKS7pac4s1lW2ZY',
	'wind': '5uyhBdXXU45smNFcfHPtgp',
	'cloudy': '5CRCwMGZml1sprlAuIN6pS',
	'partly-cloudy-day': '2wqwH7uKckoLe7UVTx1RfO',
	'partly-cloudy-night': '3ewAapAmERO3sW4cp89xk9'
};

// get the current weather summary from forecast.io
routes.getWeather = function (req, res) {
	var params = req.params;
	forecastIo.forecast(params.latitude, params.longitude, {exclude: 'minutely,hourly,daily,alerts,flags'}).then(function (data) {
		console.log((data.currently.icon));
		res.send((data.currently.icon));
	})
	.catch(function (err){
		console.log(err);
	});
}

routes.playlist = function (req, res) {
	var options = {
		url: 'https://api.spotify.com/v1/users/spotify/playlists/' + playlistMap[req.params.weather],
  		headers: {
  			'Content-Type': 'application/json',
    		'Authorization': 'Bearer ' + req.user.accessToken
  		},
  		json: true
	};
	request(options, function(err, response, body){
		if (!err) {
			console.log("Here is your playlist: ", body);
			res.send(body);
		} else {
			res.json(err);
		}
	});
}

routes.getUser = function(req, res){
	console.log("USER: ", req.user);
	res.json(req.user);
}

module.exports = routes;

