// putting together all client-side components

var App = React.createClass({
    getInitialState: function(){
        return {weather: false, user: false, playlist: false, toggleState:"toggle-button"};
    },
    componentWillMount: function () {
        //start getting weather
        $.ajax({
            url: '/user',
            success: function(data){
                console.log("Server sent me this as req.user: ", data);
                if (data){
                    this.setState({user: data});
                    if (navigator.geolocation){
                        navigator.geolocation.getCurrentPosition(this.getWeather);
                    } else {
                        console.log("Bro spotweather isn't gonna work for you man");
                    }
                }
            }.bind(this)
        });
    },
    getPlaylist: function(weather, toggleState){
        if (toggleState){
            var toggledWeather = weather;
            console.log("The toggle indicated that I shouldn't fuck with the weather so the weather is: ", toggledWeather);
        } else {
            var oppWeather = {
                'clear-day': 'partly-cloudy-day',
                'partly-cloudy-day': 'clear-day',
                'clear-night': 'partly-cloudy-night',
                'partly-cloudy-night': 'clear-night',
                'fog': 'wind',
                'wind': 'fog',
            }
            if ($.inArray(weather, ['rain', 'snow', 'sleet', 'cloudy', 'partly-cloudy-day'])+1){
                var toggledWeather = oppWeather['partly-cloudy-day'];
            } else {
                var toggledWeather = oppWeather[weather]
            }
            console.log("The toggle indicated that I should fuck with the weather so the weather is: ", toggledWeather);
        }
        console.log("I am going to get the playlist for this weather: ", toggledWeather);
        $.ajax({
            url: '/playlists/' + toggledWeather,
            success: function(data){
                console.log("Here is the playlist", data);
                this.setState({playlist: data});
            }.bind(this)
        });
    },
    getWeather: function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        $.ajax({
            url: '/' + latitude + '/' + longitude,            
            success: function(data){
                this.setState({weather: data});
                this.getPlaylist(data, "toggle-button");
            }.bind(this)
        });
    },
    onToggleClick: function(){
        if (this.state.toggleState === "toggle-button"){
            this.setState({toggleState: "toggle-button-selected"});
            this.getPlaylist(this.state.weather, false);
        } else {
            this.setState({toggleState: "toggle-button"});
            this.getPlaylist(this.state.weather, true);
        }
    },
    render: function () {
        if (this.state.user){
            var content = (
                <div className='contextParent'>
                <DisplayUser user={this.state.user}/>
                <DisplayWeather weather={this.state.weather} onToggleClick={this.onToggleClick} toggleState={this.state.toggleState}/>
                <DisplayPlaylist playlist={this.state.playlist}/>
                </div>
                );
        } else {
            var content = (
                <div className="contextParent">
                <div className="contextChild"><h1>Welcome to Spotweather.</h1></div>
                <div className="contextChild">
                <h1>After you login with Spotify, give us permission to access your location and we will get the weather wherever you 
                are and find you a Spotify playlist so you can chill no matter what the weather is like outside.</h1>
                </div>
                <Login />
                </div>);
        }
        return (
            <div className='app'>
                <Logo src="./images/light-up.svg" user={this.state.user}/>
                {content}
            </div>
        )
    }
});

ReactDOM.render(
  <App />,
  document.getElementById('content')
);