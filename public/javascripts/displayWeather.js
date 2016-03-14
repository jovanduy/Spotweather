var DisplayWeather = React.createClass({
    render: function () {

        if (this.props.weather){
            var display = this.props.weather;
            var toggleButton = (
                <div>
                <p className='toggleContext'>If you're unhappy with the current weather, use this toggle and we'll get you</p> 
                <p className='toggleContext'>a playlist designed to make you feel the opposite of what it's like outside.</p>
                <span className="toggle">
                    <div className={this.props.toggleState}>
                    <button onClick={this.props.onToggleClick}></button>
                    </div>
                </span>
                </div>
                );
        } else {
            var display = "Loading...";
        }
        return (
            <div className="contextChild">
            <h1 className='get-weather'>The weather where you are right now is: {display}</h1>
            {toggleButton}
            </div>
        );
    }
});

window.DisplayWeather = DisplayWeather;