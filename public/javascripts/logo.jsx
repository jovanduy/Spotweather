var Logo = React.createClass({

	render: function () {

		// var imgSrc = "./images/light-up.svg";

		return (
			<div className='header'>
				<span className='icon-light-up sun'></span>
				<span className='spotweather'>Spotweather</span>
			</div>
		);
	}
});

module.exports = Logo;