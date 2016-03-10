var SECRETS = require('./secrets.js');


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
//         console.log(data.currently.icon);
//     })
//     // $.get('https://api.forecast.io/forecast/' + SECRETS.FORECAST_API_KEY + '/' + position.coords.latitude + ',' + position.coords.longitude, function (results) {
//     //     console.log(results.currently.summary);
//     // });
// }

var WeatherLoader = React.createClass({
    getInitialState: function() {
        return {weather: 'loading...'};
    },

    getLocation: function (url) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else { 
            console.log('sadness');
            this.setState({weather: 'please allow geolocation'});
        }
    },

    showPosition: function (position) {
        $.ajax({
            url: 'https://api.forecast.io/forecast/' + SECRETS.FORECAST_API_KEY + '/' + position.coords.latitude + ',' + position.coords.longitude,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            },
            dataType: 'jsonp',
            success: function (data) {
                console.log(data.currently.icon);
                this.setState({weather: data.currently.icon});
            }.bind(this)
        });
    },


    componentDidMount: function() {
        this.getLocation();
    },

    render: function () {
        return (
            <p className='get-weather'>
            	Current weather: {this.state.weather}
            </p>
        );
    }
});

module.exports = WeatherLoader;
