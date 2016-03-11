var App = React.createClass({
    getInitialState: function(){
        return {weather: false, isLoggedIn: false};
    },
    componentDidMount: function(){
        //start getting weather
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.getWeather);
        } else {
            console.log("Bro spotweather isn't gonna work for you man")
        }
    },
    getWeather: function (position){
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        console.log("I got the longitude and latitude and sent it to the server");
        $.ajax({
            url: '/' + latitude + '/' + longitude,            
            success: function(data){
                console.log("DATA", data);
                this.setState({weather: data});
            }.bind(this)
        });
    },
    getUser: function(){
        this.setState({isLoggedIn: true});
    },
    render: function () {
        if (this.state.isLoggedIn){
            var content = <DisplayWeather weather={this.state.weather}/>
        } else {
            var content = <Login getUser={this.getUser}/>
        }
        return (
            <div className='app'>
                <Logo src="./images/light-up.svg"/>
                {content}
            </div>
        )
    }
});

var Login = React.createClass({
    getUser: function(){
        this.props.getUser();
    },
    render: function(){
        return (
            <a href="/auth/spotify"><button type="button" onClick={this.getUser}>LOG IN TO SPOTIFY</button></a>
            );
    }
});

ReactDOM.render(
  <App />,
  document.getElementById('content')
);