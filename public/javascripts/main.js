//this is our parent client-side component
var App = React.createClass({
    getInitialState: function(){
        return {weather: false, user: false, playlist: false, toggleState:"toggle-button"};
    },
    componentWillMount: function () {
        //check if the user is logged in or not by making a get request to /user
        $.ajax({
            url: '/user',
            success: function(data){
                if (data){
                    this.setState({user: data});    //store the user and begin getting the weather
                    if (navigator.geolocation){
                        navigator.geolocation.getCurrentPosition(this.getWeather);
                    } else {
                        console.log("Bro spotweather isn't gonna work for you man");
                    }
                }
            }.bind(this)
        });
    },
    getWeather: function (position) {
        //use the position of the browser once the user has allowed us access to their location to get the current weather
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        $.ajax({
            url: '/' + latitude + '/' + longitude,            
            success: function(data){
                this.setState({weather: data}); //store the weather and get the playlist
                this.getPlaylist(data, true);   //true means get the playlist that matches the weather, false means get the playlist that is the opposite of the weather
            }.bind(this)
        });
    },
    getPlaylist: function(weather, toggleState){
        //we have a toggle for the user to indicate if they want a playlist that matches the weather or if they want a playlist that is the opposite
        //of the weather, so we check the togglestate before sending the get request to the server for the playlist
        if (toggleState){
            var toggledWeather = weather;   //user wants a playlist that matches the weather
        } else {
            //I created this object to basically store opposite weather pairs but I don't think this is an elegant solution
            var oppWeather = {
                'clear-day': 'partly-cloudy-day',
                'partly-cloudy-day': 'clear-day',
                'clear-night': 'partly-cloudy-night',
                'partly-cloudy-night': 'clear-night',
                'fog': 'wind',
                'wind': 'fog',
            }
            //basically rain, snow, sleet, cloudy, and partly-cloudy-day all are opposite to our clear-day playlist
            if ($.inArray(weather, ['rain', 'snow', 'sleet', 'cloudy', 'partly-cloudy-day'])+1){    //returns a -1 if the weather is not in this array, +1 to make it evaluate to false
                var toggledWeather = oppWeather['partly-cloudy-day'];   //returns clear-day as weather which works
            } else {
                var toggledWeather = oppWeather[weather]
            }
        }
        console.log("I am going to get the playlist for this weather: ", toggledWeather);
        $.ajax({
            url: '/playlists/' + toggledWeather,
            success: function(data){
                this.setState({playlist: data});    //store the playlist
            }.bind(this)
        });
    },
    //changes the class of the toggle-button to accurately change the styling on click from toggle-button to toggle-button-selected
    onToggleClick: function(){
        if (this.state.toggleState === "toggle-button"){
            this.setState({toggleState: "toggle-button-selected"});
            this.getPlaylist(this.state.weather, false);    //when toggleState is changed, we need to call getPlaylist to get the different playlist
        } else {
            this.setState({toggleState: "toggle-button"});
            this.getPlaylist(this.state.weather, true);
        }
    },
    render: function () {
        if (this.state.user){   //if client got a user from req.user indicating that the user has logged in
            var content = (
                <div className='contextParent'>
                <DisplayUser user={this.state.user}/>
                <DisplayWeather weather={this.state.weather} onToggleClick={this.onToggleClick} toggleState={this.state.toggleState}/>
                <DisplayPlaylist playlist={this.state.playlist}/>
                </div>
                );
        } else {    //client got an undefined user from req.user indicating that the user has not logged in yet
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