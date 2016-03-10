(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var SECRETS = require('./secrets.js');


function getLocation(url) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        console.log('sadness');
    }
}

function showPosition(position) {
    $.ajax({
        url: 'https://api.forecast.io/forecast/' + SECRETS.FORECAST_API_KEY + '/' + position.coords.latitude + ',' + position.coords.longitude,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        },
        dataType: 'jsonp' //not sure if this is sketch or not....

    }).done(function (data) {
        console.log(data.currently.icon);
    })
    // $.get('https://api.forecast.io/forecast/' + SECRETS.FORECAST_API_KEY + '/' + position.coords.latitude + ',' + position.coords.longitude, function (results) {
    //     console.log(results.currently.summary);
    // });
}

var WeatherLink = React.createClass({displayName: "WeatherLink",
    handleClick: function (event) {
        console.log("loading...");
        getLocation();
    },

    render: function () {
        return (
            React.createElement("p", {className: "get-weather", onClick: this.handleClick}, 
            	"click for weather!"
            )
        );
    }
});

module.exports = WeatherLink;

},{"./secrets.js":5}],2:[function(require,module,exports){
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

var WeatherLoader = React.createClass({displayName: "WeatherLoader",
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
            React.createElement("p", {className: "get-weather"}, 
            	"Current weather: ", this.state.weather
            )
        );
    }
});

module.exports = WeatherLoader;

},{"./secrets.js":5}],3:[function(require,module,exports){
var Logo = React.createClass({displayName: "Logo",

	render: function () {

		// var imgSrc = "./images/light-up.svg";

		return (
			React.createElement("div", {className: "header"}, 
				React.createElement("span", {className: "icon-light-up sun"}), 
				React.createElement("span", {className: "spotweather"}, "Spotweather")
			)
		);
	}
});

module.exports = Logo;

},{}],4:[function(require,module,exports){
var SECRETS = require('./secrets.js');
var Logo = require('./logo.jsx');
var WeatherLink = require('./getWeather.jsx');
var WeatherLoader = require('./loadWeather.jsx');


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



var App = React.createClass({displayName: "App",
    render: function () {
        return (
            React.createElement("div", {className: "app"}, 
                React.createElement(Logo, {src: "./images/light-up.svg"}), 
                React.createElement(WeatherLink, null), 
                React.createElement(WeatherLoader, null)
            )
        )
    }
})

ReactDOM.render(
  React.createElement(App, null),
  document.getElementById('content')
);

},{"./getWeather.jsx":1,"./loadWeather.jsx":2,"./logo.jsx":3,"./secrets.js":5}],5:[function(require,module,exports){
module.exports = {
	FORECAST_API_KEY: '1cc7d139d434a469c5041587a50b3220',
	SPOTIFY_CLIENT_ID:'336855f1efd54d80a47d3c98f929e392',
	SPOTIFY_CLIENT_SECRET:'8d688d316a174982a827e3b094955651'
}

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvSm9yZGFuL0RvY3VtZW50cy9PbGluanMvU3BvdHdlYXRoZXIvcHVibGljL2phdmFzY3JpcHRzL2dldFdlYXRoZXIuanN4IiwiL1VzZXJzL0pvcmRhbi9Eb2N1bWVudHMvT2xpbmpzL1Nwb3R3ZWF0aGVyL3B1YmxpYy9qYXZhc2NyaXB0cy9sb2FkV2VhdGhlci5qc3giLCIvVXNlcnMvSm9yZGFuL0RvY3VtZW50cy9PbGluanMvU3BvdHdlYXRoZXIvcHVibGljL2phdmFzY3JpcHRzL2xvZ28uanN4IiwiL1VzZXJzL0pvcmRhbi9Eb2N1bWVudHMvT2xpbmpzL1Nwb3R3ZWF0aGVyL3B1YmxpYy9qYXZhc2NyaXB0cy9tYWluLmpzeCIsIi9Vc2Vycy9Kb3JkYW4vRG9jdW1lbnRzL09saW5qcy9TcG90d2VhdGhlci9wdWJsaWMvamF2YXNjcmlwdHMvc2VjcmV0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUN0Qzs7QUFFQSxTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN2QixJQUFJLFNBQVMsQ0FBQyxXQUFXLEVBQUU7UUFDdkIsU0FBUyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUMxRCxNQUFNO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUMxQjtBQUNMLENBQUM7O0FBRUQsU0FBUyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDN0IsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNILEdBQUcsRUFBRSxtQ0FBbUMsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENB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QztDQUNwRCxxQkFBcUIsQ0FBQyxrQ0FBa0MiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFNFQ1JFVFMgPSByZXF1aXJlKCcuL3NlY3JldHMuanMnKTtcblxuXG5mdW5jdGlvbiBnZXRMb2NhdGlvbih1cmwpIHtcbiAgICBpZiAobmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XG4gICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oc2hvd1Bvc2l0aW9uKTtcbiAgICB9IGVsc2UgeyBcbiAgICAgICAgY29uc29sZS5sb2coJ3NhZG5lc3MnKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNob3dQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJ2h0dHBzOi8vYXBpLmZvcmVjYXN0LmlvL2ZvcmVjYXN0LycgKyBTRUNSRVRTLkZPUkVDQVNUX0FQSV9LRVkgKyAnLycgKyBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyAnLCcgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiOiBcIipcIixcbiAgICAgICAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVyc1wiOiBcIk9yaWdpbiwgWC1SZXF1ZXN0ZWQtV2l0aCwgQ29udGVudC1UeXBlLCBBY2NlcHRcIlxuICAgICAgICB9LFxuICAgICAgICBkYXRhVHlwZTogJ2pzb25wJyAvL25vdCBzdXJlIGlmIHRoaXMgaXMgc2tldGNoIG9yIG5vdC4uLi5cblxuICAgIH0pLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YS5jdXJyZW50bHkuaWNvbik7XG4gICAgfSlcbiAgICAvLyAkLmdldCgnaHR0cHM6Ly9hcGkuZm9yZWNhc3QuaW8vZm9yZWNhc3QvJyArIFNFQ1JFVFMuRk9SRUNBU1RfQVBJX0tFWSArICcvJyArIHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArICcsJyArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUsIGZ1bmN0aW9uIChyZXN1bHRzKSB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKHJlc3VsdHMuY3VycmVudGx5LnN1bW1hcnkpO1xuICAgIC8vIH0pO1xufVxuXG52YXIgV2VhdGhlckxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImxvYWRpbmcuLi5cIik7XG4gICAgICAgIGdldExvY2F0aW9uKCk7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdnZXQtd2VhdGhlcicgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+XG4gICAgICAgICAgICBcdGNsaWNrIGZvciB3ZWF0aGVyIVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdlYXRoZXJMaW5rO1xuIiwidmFyIFNFQ1JFVFMgPSByZXF1aXJlKCcuL3NlY3JldHMuanMnKTtcblxuXG4vLyBmdW5jdGlvbiBnZXRMb2NhdGlvbih1cmwpIHtcbi8vICAgICBpZiAobmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XG4vLyAgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oc2hvd1Bvc2l0aW9uKTtcbi8vICAgICB9IGVsc2UgeyBcbi8vICAgICAgICAgY29uc29sZS5sb2coJ3NhZG5lc3MnKTtcbi8vICAgICB9XG4vLyB9XG5cbi8vIGZ1bmN0aW9uIHNob3dQb3NpdGlvbihwb3NpdGlvbikge1xuLy8gICAgICQuYWpheCh7XG4vLyAgICAgICAgIHVybDogJ2h0dHBzOi8vYXBpLmZvcmVjYXN0LmlvL2ZvcmVjYXN0LycgKyBTRUNSRVRTLkZPUkVDQVNUX0FQSV9LRVkgKyAnLycgKyBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyAnLCcgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlLFxuLy8gICAgICAgICBoZWFkZXJzOiB7XG4vLyAgICAgICAgICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiOiBcIipcIixcbi8vICAgICAgICAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVyc1wiOiBcIk9yaWdpbiwgWC1SZXF1ZXN0ZWQtV2l0aCwgQ29udGVudC1UeXBlLCBBY2NlcHRcIlxuLy8gICAgICAgICB9LFxuLy8gICAgICAgICBkYXRhVHlwZTogJ2pzb25wJyAvL25vdCBzdXJlIGlmIHRoaXMgaXMgc2tldGNoIG9yIG5vdC4uLi5cblxuLy8gICAgIH0pLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcbi8vICAgICAgICAgY29uc29sZS5sb2coZGF0YS5jdXJyZW50bHkuaWNvbik7XG4vLyAgICAgfSlcbi8vICAgICAvLyAkLmdldCgnaHR0cHM6Ly9hcGkuZm9yZWNhc3QuaW8vZm9yZWNhc3QvJyArIFNFQ1JFVFMuRk9SRUNBU1RfQVBJX0tFWSArICcvJyArIHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArICcsJyArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUsIGZ1bmN0aW9uIChyZXN1bHRzKSB7XG4vLyAgICAgLy8gICAgIGNvbnNvbGUubG9nKHJlc3VsdHMuY3VycmVudGx5LnN1bW1hcnkpO1xuLy8gICAgIC8vIH0pO1xuLy8gfVxuXG52YXIgV2VhdGhlckxvYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge3dlYXRoZXI6ICdsb2FkaW5nLi4uJ307XG4gICAgfSxcblxuICAgIGdldExvY2F0aW9uOiBmdW5jdGlvbiAodXJsKSB7XG4gICAgICAgIGlmIChuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcbiAgICAgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24odGhpcy5zaG93UG9zaXRpb24pO1xuICAgICAgICB9IGVsc2UgeyBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzYWRuZXNzJyk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt3ZWF0aGVyOiAncGxlYXNlIGFsbG93IGdlb2xvY2F0aW9uJ30pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNob3dQb3NpdGlvbjogZnVuY3Rpb24gKHBvc2l0aW9uKSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6ICdodHRwczovL2FwaS5mb3JlY2FzdC5pby9mb3JlY2FzdC8nICsgU0VDUkVUUy5GT1JFQ0FTVF9BUElfS0VZICsgJy8nICsgcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlICsgJywnICsgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiOiBcIipcIixcbiAgICAgICAgICAgICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnNcIjogXCJPcmlnaW4sIFgtUmVxdWVzdGVkLVdpdGgsIENvbnRlbnQtVHlwZSwgQWNjZXB0XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb25wJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5jdXJyZW50bHkuaWNvbik7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7d2VhdGhlcjogZGF0YS5jdXJyZW50bHkuaWNvbn0pO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgIH0pO1xuICAgIH0sXG5cblxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5nZXRMb2NhdGlvbigpO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nZ2V0LXdlYXRoZXInPlxuICAgICAgICAgICAgXHRDdXJyZW50IHdlYXRoZXI6IHt0aGlzLnN0YXRlLndlYXRoZXJ9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gV2VhdGhlckxvYWRlcjtcbiIsInZhciBMb2dvID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cdHJlbmRlcjogZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gdmFyIGltZ1NyYyA9IFwiLi9pbWFnZXMvbGlnaHQtdXAuc3ZnXCI7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9J2hlYWRlcic+XG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT0naWNvbi1saWdodC11cCBzdW4nPjwvc3Bhbj5cblx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPSdzcG90d2VhdGhlcic+U3BvdHdlYXRoZXI8L3NwYW4+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb2dvOyIsInZhciBTRUNSRVRTID0gcmVxdWlyZSgnLi9zZWNyZXRzLmpzJyk7XG52YXIgTG9nbyA9IHJlcXVpcmUoJy4vbG9nby5qc3gnKTtcbnZhciBXZWF0aGVyTGluayA9IHJlcXVpcmUoJy4vZ2V0V2VhdGhlci5qc3gnKTtcbnZhciBXZWF0aGVyTG9hZGVyID0gcmVxdWlyZSgnLi9sb2FkV2VhdGhlci5qc3gnKTtcblxuXG4vLyBmdW5jdGlvbiBnZXRMb2NhdGlvbih1cmwpIHtcbi8vICAgICBpZiAobmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XG4vLyAgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oc2hvd1Bvc2l0aW9uKTtcbi8vICAgICB9IGVsc2UgeyBcbi8vICAgICAgICAgY29uc29sZS5sb2coJ3NhZG5lc3MnKTtcbi8vICAgICB9XG4vLyB9XG5cbi8vIGZ1bmN0aW9uIHNob3dQb3NpdGlvbihwb3NpdGlvbikge1xuLy8gICAgICQuYWpheCh7XG4vLyAgICAgICAgIHVybDogJ2h0dHBzOi8vYXBpLmZvcmVjYXN0LmlvL2ZvcmVjYXN0LycgKyBTRUNSRVRTLkZPUkVDQVNUX0FQSV9LRVkgKyAnLycgKyBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyAnLCcgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlLFxuLy8gICAgICAgICBoZWFkZXJzOiB7XG4vLyAgICAgICAgICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiOiBcIipcIixcbi8vICAgICAgICAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVyc1wiOiBcIk9yaWdpbiwgWC1SZXF1ZXN0ZWQtV2l0aCwgQ29udGVudC1UeXBlLCBBY2NlcHRcIlxuLy8gICAgICAgICB9LFxuLy8gICAgICAgICBkYXRhVHlwZTogJ2pzb25wJyAvL25vdCBzdXJlIGlmIHRoaXMgaXMgc2tldGNoIG9yIG5vdC4uLi5cblxuLy8gICAgIH0pLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcbi8vICAgICAgICAgY29uc29sZS5sb2coZGF0YS5jdXJyZW50bHkuc3VtbWFyeSk7XG4vLyAgICAgfSlcbi8vICAgICAvLyAkLmdldCgnaHR0cHM6Ly9hcGkuZm9yZWNhc3QuaW8vZm9yZWNhc3QvJyArIFNFQ1JFVFMuRk9SRUNBU1RfQVBJX0tFWSArICcvJyArIHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArICcsJyArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUsIGZ1bmN0aW9uIChyZXN1bHRzKSB7XG4vLyAgICAgLy8gICAgIGNvbnNvbGUubG9nKHJlc3VsdHMuY3VycmVudGx5LnN1bW1hcnkpO1xuLy8gICAgIC8vIH0pO1xuLy8gfVxuXG4vLyB2YXIgV2VhdGhlckxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4vLyAgICAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uIChldmVudCkge1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhcInlveW95b1wiKTtcbi8vICAgICAgICAgZ2V0TG9jYXRpb24oKTtcbi8vICAgICB9LFxuXG4vLyAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgIHJldHVybiAoXG4vLyAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2dldC13ZWF0aGVyJyBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT5cbi8vICAgICAgICAgICAgIFx0Y2xpY2sgZm9yIHdlYXRoZXIhXG4vLyAgICAgICAgICAgICA8L3A+XG4vLyAgICAgICAgICk7XG4vLyAgICAgfVxuLy8gfSk7XG5cblxuXG52YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2FwcCc+XG4gICAgICAgICAgICAgICAgPExvZ28gc3JjPVwiLi9pbWFnZXMvbGlnaHQtdXAuc3ZnXCIvPlxuICAgICAgICAgICAgICAgIDxXZWF0aGVyTGluayAvPlxuICAgICAgICAgICAgICAgIDxXZWF0aGVyTG9hZGVyIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn0pXG5cblJlYWN0RE9NLnJlbmRlcihcbiAgPEFwcCAvPixcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKVxuKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHtcblx0Rk9SRUNBU1RfQVBJX0tFWTogJzFjYzdkMTM5ZDQzNGE0NjljNTA0MTU4N2E1MGIzMjIwJyxcblx0U1BPVElGWV9DTElFTlRfSUQ6JzMzNjg1NWYxZWZkNTRkODBhNDdkM2M5OGY5MjllMzkyJyxcblx0U1BPVElGWV9DTElFTlRfU0VDUkVUOic4ZDY4OGQzMTZhMTc0OTgyYTgyN2UzYjA5NDk1NTY1MSdcbn0iXX0=
