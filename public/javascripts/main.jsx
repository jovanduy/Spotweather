var SECRETS = require('./secrets.js');


function getLocation(url) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        console.log('sadness');
    }
}

function showPosition(position) {
    $.get('https://api.forecast.io/forecast/' + SECRETS.FORECAST_API_KEY + '/' + position.coords.latitude + ',' + position.coords.longitude, function (results) {
        console.log(results.currently.summary);
    });
}

var WeatherLink = React.createClass({
    handleClick: function (event) {
        console.log("yoyoyo");
        getLocation();
    },

    render: function () {
        return (
            <p onClick={this.handleClick}>
            	click for weather!
            </p>
        );
    }
});

ReactDOM.render(
  <WeatherLink />,
  document.getElementById('content')
);