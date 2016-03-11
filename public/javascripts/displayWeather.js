var DisplayWeather = React.createClass({
    render: function () {
        if (this.props.weather){
            var display = this.props.weather;
        } else {
            var display = "Loading...";
        }
        return (
            <p className='get-weather'>
            	Current weather: {display}
            </p>
        );
    }
});

window.DisplayWeather = DisplayWeather;