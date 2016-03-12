// name of website and sun logo
var Logo = React.createClass({

	render: function () {
		return (
			<div className='header'>
				<span className='icon-light-up sun'></span>
				<span className='spotweather'>Spotweather</span>
			</div>
		);
	}
});

window.Logo = Logo;