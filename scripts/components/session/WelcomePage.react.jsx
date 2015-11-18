var React = require('react');
var SessionStore = require('../../stores/SessionStore.react.jsx');

var WelcomePage = React.createClass({

	render: function() {
		var WelcomeDisplay = SessionStore.isLoggedIn() ? (
			<div className="row">
				<br/>
				<strong>Welcome {SessionStore.getUser()}! Get started by clicking on the 'Lessons' or 'Questions' links on the header bar.</strong>
			</div>
			) : (
			<div className="row">
				<br/>
				<strong>Welcome to the Code for Chicago web application prototype!<br/>
				Please log in or sign up in the upper right corner.</strong>
			</div>);
		return (WelcomeDisplay);
	}
});

module.exports = WelcomePage;