var Login = React.createClass({
    getUser: function(){
        this.props.getUser();
    },
    render: function(){
        return (
            <button type="button" href="/auth/spotify" onClick={this.getUser}>Login to Spotify</button>
            );
    }
});

window.Login = Login;
