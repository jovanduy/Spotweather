// name of website and sun logo
var Logo = React.createClass({

	render: function () {
		if (this.props.user){
			var logout = (<a href='/logout'>Logout</a>);
		} else {
			var logout = (<div className="notLoggedIn"></div>);
		}
		return (
			<div className='header'>
				<img className='icon-light-up sun' src={this.props.src} height="40"/>
				<span className='spotweather'> Spotweather</span>
				<span className='logoutButton'>{logout}</span>
			</div>
		);
	}
});

window.Logo = Logo;