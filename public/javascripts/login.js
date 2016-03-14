// login button

var Login = React.createClass({
    render: function(){
        return (
            <div className="contextChild">
            <a href='/auth/spotify'>Login to Spotify</a>
            </div>
        );
    }
});

window.Login = Login;
