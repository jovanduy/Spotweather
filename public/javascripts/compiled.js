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
    $.get('https://api.forecast.io/forecast/' + SECRETS.FORECAST_API_KEY + '/' + position.coords.latitude + ',' + position.coords.longitude, function (results) {
        console.log(results.currently.summary);
    });
}

var WeatherLink = React.createClass({displayName: "WeatherLink",
    handleClick: function (event) {
        console.log("yoyoyo");
        getLocation();
    },

    render: function () {
        return (
            React.createElement("p", {onClick: this.handleClick}, 
            	"click for weather!"
            )
        );
    }
});

ReactDOM.render(
  React.createElement(WeatherLink, null),
  document.getElementById('content')
);

},{"./secrets.js":2}],2:[function(require,module,exports){
module.exports = {
	FORECAST_API_KEY: '1cc7d139d434a469c5041587a50b3220',
	SPOTIFY_CLIENT_ID:'336855f1efd54d80a47d3c98f929e392',
	SPOTIFY_CLIENT_SECRET:'8d688d316a174982a827e3b094955651'
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvSm9yZGFuL0RvY3VtZW50cy9PbGluanMvU3BvdHdlYXRoZXIvcHVibGljL2phdmFzY3JpcHRzL21haW4uanN4IiwiL1VzZXJzL0pvcmRhbi9Eb2N1bWVudHMvT2xpbmpzL1Nwb3R3ZWF0aGVyL3B1YmxpYy9qYXZhc2NyaXB0cy9zZWNyZXRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3RDOztBQUVBLFNBQVMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLElBQUksU0FBUyxDQUFDLFdBQVcsRUFBRTtRQUN2QixTQUFTLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQzFELE1BQU07UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQzFCO0FBQ0wsQ0FBQzs7QUFFRCxTQUFTLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM3QixDQUFDLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFVBQVUsT0FBTyxFQUFFLENBQUM7UUFDekosT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzFDLENBQUMsQ0FBQztBQUNQLENBQUM7O0FBRUQsSUFBSSxpQ0FBaUMsMkJBQUE7SUFDakMsV0FBVyxFQUFFLFVBQVUsS0FBSyxFQUFFLENBQUM7UUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QixXQUFXLEVBQUUsQ0FBQztBQUN0QixLQUFLOztJQUVELE1BQU0sRUFBRSxZQUFZLENBQUM7UUFDakI7WUFDSSxvQkFBQSxHQUFFLEVBQUEsQ0FBQSxDQUFDLE9BQUEsRUFBTyxDQUFFLElBQUksQ0FBQyxXQUFhLENBQUEsRUFBQTtBQUFBLGFBQUEsb0JBQUE7QUFBQSxZQUUxQixDQUFBO1VBQ047S0FDTDtBQUNMLENBQUMsQ0FBQyxDQUFDOztBQUVILFFBQVEsQ0FBQyxNQUFNO0VBQ2Isb0JBQUMsV0FBVyxFQUFBLElBQUEsQ0FBRyxDQUFBO0VBQ2YsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7Q0FDbkM7OztBQ25DRCxNQUFNLENBQUMsT0FBTyxHQUFHO0NBQ2hCLGdCQUFnQixFQUFFLGtDQUFrQztDQUNwRCxpQkFBaUIsQ0FBQyxrQ0FBa0M7Q0FDcEQscUJBQXFCLENBQUMsa0NBQWtDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBTRUNSRVRTID0gcmVxdWlyZSgnLi9zZWNyZXRzLmpzJyk7XG5cblxuZnVuY3Rpb24gZ2V0TG9jYXRpb24odXJsKSB7XG4gICAgaWYgKG5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xuICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHNob3dQb3NpdGlvbik7XG4gICAgfSBlbHNlIHsgXG4gICAgICAgIGNvbnNvbGUubG9nKCdzYWRuZXNzJyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzaG93UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAkLmdldCgnaHR0cHM6Ly9hcGkuZm9yZWNhc3QuaW8vZm9yZWNhc3QvJyArIFNFQ1JFVFMuRk9SRUNBU1RfQVBJX0tFWSArICcvJyArIHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArICcsJyArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUsIGZ1bmN0aW9uIChyZXN1bHRzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdHMuY3VycmVudGx5LnN1bW1hcnkpO1xuICAgIH0pO1xufVxuXG52YXIgV2VhdGhlckxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInlveW95b1wiKTtcbiAgICAgICAgZ2V0TG9jYXRpb24oKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8cCBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT5cbiAgICAgICAgICAgIFx0Y2xpY2sgZm9yIHdlYXRoZXIhXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cblJlYWN0RE9NLnJlbmRlcihcbiAgPFdlYXRoZXJMaW5rIC8+LFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpXG4pOyIsIm1vZHVsZS5leHBvcnRzID0ge1xuXHRGT1JFQ0FTVF9BUElfS0VZOiAnMWNjN2QxMzlkNDM0YTQ2OWM1MDQxNTg3YTUwYjMyMjAnLFxuXHRTUE9USUZZX0NMSUVOVF9JRDonMzM2ODU1ZjFlZmQ1NGQ4MGE0N2QzYzk4ZjkyOWUzOTInLFxuXHRTUE9USUZZX0NMSUVOVF9TRUNSRVQ6JzhkNjg4ZDMxNmExNzQ5ODJhODI3ZTNiMDk0OTU1NjUxJ1xufSJdfQ==
