var DisplayPlaylist = React.createClass({
    rawMarkup: function() {
        var rawMarkup = marked(this.props.playlist.description.toString(), {sanitize: true});
        return { __html: rawMarkup };
    },
    render: function () {
        if (this.props.playlist){
            var display = (
                <div>
                <h1>The playlist we have found for this weather is</h1>
                <img src={this.props.playlist.images[0].url}/>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
                <a href={this.props.playlist.external_urls.spotify} target="_blank">Launch Spotify</a>
                </div>
                ); 
        } else {
            var display = (<div id="playlistButtonLoading"></div>);
        }
        return (
            <div className="contextChild">{display}</div>   
            );
    }
});

window.DisplayPlaylist = DisplayPlaylist;