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

},{"./secrets.js":4}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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



var App = React.createClass({displayName: "App",
    render: function () {
        return (
            React.createElement("div", {className: "app"}, 
                React.createElement(Logo, {src: "./images/light-up.svg"}), 
                React.createElement(WeatherLink, null)
            )
        )
    }
})

ReactDOM.render(
  React.createElement(App, null),
  document.getElementById('content')
);

},{"./getWeather.jsx":1,"./logo.jsx":2,"./secrets.js":4}],4:[function(require,module,exports){
module.exports = {
	FORECAST_API_KEY: '1cc7d139d434a469c5041587a50b3220',
	SPOTIFY_CLIENT_ID:'336855f1efd54d80a47d3c98f929e392',
	SPOTIFY_CLIENT_SECRET:'8d688d316a174982a827e3b094955651'
}

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvSm9yZGFuL0RvY3VtZW50cy9PbGluanMvU3BvdHdlYXRoZXIvcHVibGljL2phdmFzY3JpcHRzL2dldFdlYXRoZXIuanN4IiwiL1VzZXJzL0pvcmRhbi9Eb2N1bWVudHMvT2xpbmpzL1Nwb3R3ZWF0aGVyL3B1YmxpYy9qYXZhc2NyaXB0cy9sb2dvLmpzeCIsIi9Vc2Vycy9Kb3JkYW4vRG9jdW1lbnRzL09saW5qcy9TcG90d2VhdGhlci9wdWJsaWMvamF2YXNjcmlwdHMvbWFpbi5qc3giLCIvVXNlcnMvSm9yZGFuL0RvY3VtZW50cy9PbGluanMvU3BvdHdlYXRoZXIvcHVibGljL2phdmFzY3JpcHRzL3NlY3JldHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDdEM7O0FBRUEsU0FBUyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDdkIsSUFBSSxTQUFTLENBQUMsV0FBVyxFQUFFO1FBQ3ZCLFNBQVMsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDMUQsTUFBTTtRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDMUI7QUFDTCxDQUFDOztBQUVELFNBQVMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzdCLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDSCxHQUFHLEVBQUUsbUNBQW1DLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTO1FBQ3RJLE9BQU8sRUFBRTtZQUNMLDZCQUE2QixFQUFF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QUFHLEVBQUEsSUFBQSxDQUFHLENBQUE7RUFDUCxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztDQUNuQzs7O0FDN0RELE1BQU0sQ0FBQyxPQUFPLEdBQUc7Q0FDaEIsZ0JBQWdCLEVBQUUsa0NBQWtDO0NBQ3BELGlCQUFpQixDQUFDLGtDQUFrQztDQUNwRCxxQkFBcUIsQ0FBQyxrQ0FBa0MiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFNFQ1JFVFMgPSByZXF1aXJlKCcuL3NlY3JldHMuanMnKTtcblxuXG5mdW5jdGlvbiBnZXRMb2NhdGlvbih1cmwpIHtcbiAgICBpZiAobmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XG4gICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oc2hvd1Bvc2l0aW9uKTtcbiAgICB9IGVsc2UgeyBcbiAgICAgICAgY29uc29sZS5sb2coJ3NhZG5lc3MnKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNob3dQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJ2h0dHBzOi8vYXBpLmZvcmVjYXN0LmlvL2ZvcmVjYXN0LycgKyBTRUNSRVRTLkZPUkVDQVNUX0FQSV9LRVkgKyAnLycgKyBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyAnLCcgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiOiBcIipcIixcbiAgICAgICAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVyc1wiOiBcIk9yaWdpbiwgWC1SZXF1ZXN0ZWQtV2l0aCwgQ29udGVudC1UeXBlLCBBY2NlcHRcIlxuICAgICAgICB9LFxuICAgICAgICBkYXRhVHlwZTogJ2pzb25wJyAvL25vdCBzdXJlIGlmIHRoaXMgaXMgc2tldGNoIG9yIG5vdC4uLi5cblxuICAgIH0pLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YS5jdXJyZW50bHkuaWNvbik7XG4gICAgfSlcbiAgICAvLyAkLmdldCgnaHR0cHM6Ly9hcGkuZm9yZWNhc3QuaW8vZm9yZWNhc3QvJyArIFNFQ1JFVFMuRk9SRUNBU1RfQVBJX0tFWSArICcvJyArIHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArICcsJyArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUsIGZ1bmN0aW9uIChyZXN1bHRzKSB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKHJlc3VsdHMuY3VycmVudGx5LnN1bW1hcnkpO1xuICAgIC8vIH0pO1xufVxuXG52YXIgV2VhdGhlckxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImxvYWRpbmcuLi5cIik7XG4gICAgICAgIGdldExvY2F0aW9uKCk7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdnZXQtd2VhdGhlcicgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+XG4gICAgICAgICAgICBcdGNsaWNrIGZvciB3ZWF0aGVyIVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdlYXRoZXJMaW5rO1xuIiwidmFyIExvZ28gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cblx0cmVuZGVyOiBmdW5jdGlvbiAoKSB7XG5cblx0XHQvLyB2YXIgaW1nU3JjID0gXCIuL2ltYWdlcy9saWdodC11cC5zdmdcIjtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0naGVhZGVyJz5cblx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPSdpY29uLWxpZ2h0LXVwIHN1bic+PC9zcGFuPlxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9J3Nwb3R3ZWF0aGVyJz5TcG90d2VhdGhlcjwvc3Bhbj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvZ287IiwidmFyIFNFQ1JFVFMgPSByZXF1aXJlKCcuL3NlY3JldHMuanMnKTtcbnZhciBMb2dvID0gcmVxdWlyZSgnLi9sb2dvLmpzeCcpO1xudmFyIFdlYXRoZXJMaW5rID0gcmVxdWlyZSgnLi9nZXRXZWF0aGVyLmpzeCcpO1xuXG5cbi8vIGZ1bmN0aW9uIGdldExvY2F0aW9uKHVybCkge1xuLy8gICAgIGlmIChuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcbi8vICAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihzaG93UG9zaXRpb24pO1xuLy8gICAgIH0gZWxzZSB7IFxuLy8gICAgICAgICBjb25zb2xlLmxvZygnc2FkbmVzcycpO1xuLy8gICAgIH1cbi8vIH1cblxuLy8gZnVuY3Rpb24gc2hvd1Bvc2l0aW9uKHBvc2l0aW9uKSB7XG4vLyAgICAgJC5hamF4KHtcbi8vICAgICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkuZm9yZWNhc3QuaW8vZm9yZWNhc3QvJyArIFNFQ1JFVFMuRk9SRUNBU1RfQVBJX0tFWSArICcvJyArIHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArICcsJyArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUsXG4vLyAgICAgICAgIGhlYWRlcnM6IHtcbi8vICAgICAgICAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCI6IFwiKlwiLFxuLy8gICAgICAgICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCI6IFwiT3JpZ2luLCBYLVJlcXVlc3RlZC1XaXRoLCBDb250ZW50LVR5cGUsIEFjY2VwdFwiXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIGRhdGFUeXBlOiAnanNvbnAnIC8vbm90IHN1cmUgaWYgdGhpcyBpcyBza2V0Y2ggb3Igbm90Li4uLlxuXG4vLyAgICAgfSkuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmN1cnJlbnRseS5zdW1tYXJ5KTtcbi8vICAgICB9KVxuLy8gICAgIC8vICQuZ2V0KCdodHRwczovL2FwaS5mb3JlY2FzdC5pby9mb3JlY2FzdC8nICsgU0VDUkVUUy5GT1JFQ0FTVF9BUElfS0VZICsgJy8nICsgcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlICsgJywnICsgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSwgZnVuY3Rpb24gKHJlc3VsdHMpIHtcbi8vICAgICAvLyAgICAgY29uc29sZS5sb2cocmVzdWx0cy5jdXJyZW50bHkuc3VtbWFyeSk7XG4vLyAgICAgLy8gfSk7XG4vLyB9XG5cbi8vIHZhciBXZWF0aGVyTGluayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbi8vICAgICBoYW5kbGVDbGljazogZnVuY3Rpb24gKGV2ZW50KSB7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwieW95b3lvXCIpO1xuLy8gICAgICAgICBnZXRMb2NhdGlvbigpO1xuLy8gICAgIH0sXG5cbi8vICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgcmV0dXJuIChcbi8vICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nZ2V0LXdlYXRoZXInIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PlxuLy8gICAgICAgICAgICAgXHRjbGljayBmb3Igd2VhdGhlciFcbi8vICAgICAgICAgICAgIDwvcD5cbi8vICAgICAgICAgKTtcbi8vICAgICB9XG4vLyB9KTtcblxuXG5cbnZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYXBwJz5cbiAgICAgICAgICAgICAgICA8TG9nbyBzcmM9XCIuL2ltYWdlcy9saWdodC11cC5zdmdcIi8+XG4gICAgICAgICAgICAgICAgPFdlYXRoZXJMaW5rIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn0pXG5cblJlYWN0RE9NLnJlbmRlcihcbiAgPEFwcCAvPixcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKVxuKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHtcblx0Rk9SRUNBU1RfQVBJX0tFWTogJzFjYzdkMTM5ZDQzNGE0NjljNTA0MTU4N2E1MGIzMjIwJyxcblx0U1BPVElGWV9DTElFTlRfSUQ6JzMzNjg1NWYxZWZkNTRkODBhNDdkM2M5OGY5MjllMzkyJyxcblx0U1BPVElGWV9DTElFTlRfU0VDUkVUOic4ZDY4OGQzMTZhMTc0OTgyYTgyN2UzYjA5NDk1NTY1MSdcbn0iXX0=
