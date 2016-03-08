var Logo = require('./logo.jsx');

var Logo = React.createClass({

	render: function () {

		// var imgSrc = "./images/light-up.svg";

		return (
			<div className='name'>
				<span className='icon-light-up sun'></span>
				<span className='spotweather'>Spotweather</span>
			</div>
		);
	}
});

module.exports = Logo;