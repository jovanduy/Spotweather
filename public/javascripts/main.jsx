var SECRETS = require('./secrets.js');
var Logo = require('./logo.jsx');
var WeatherLink = require('./getWeather.jsx');


// function getLocation(url) {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     } else { 
//         console.log('sadness');
//     }
// }

// function showPosition(position) {
//     $.ajax({
//         url: 'https://api.forecast.io/forecast/' + SECRETS.FORECAST_API_KEY + '/' + position.coords.latitude + ',' + position.coords.longitude,
//         headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
//         },
//         dataType: 'jsonp' //not sure if this is sketch or not....

//     }).done(function (data) {
//         console.log(data.currently.summary);
//     })
//     // $.get('https://api.forecast.io/forecast/' + SECRETS.FORECAST_API_KEY + '/' + position.coords.latitude + ',' + position.coords.longitude, function (results) {
//     //     console.log(results.currently.summary);
//     // });
// }

// var WeatherLink = React.createClass({
//     handleClick: function (event) {
//         console.log("yoyoyo");
//         getLocation();
//     },

//     render: function () {
//         return (
//             <p className='get-weather' onClick={this.handleClick}>
//             	click for weather!
//             </p>
//         );
//     }
// });



var App = React.createClass({
    render: function () {
        return (
            <div className='app'>
                <Logo src="./images/light-up.svg"/>
                <WeatherLink />
            </div>
        )
    }
})

ReactDOM.render(
  <App />,
  document.getElementById('content')
);