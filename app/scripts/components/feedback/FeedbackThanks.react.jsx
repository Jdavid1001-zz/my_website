var React = require('react');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');

var FeedbackThanks = React.createClass({

	_onPress: function(e) {
		e.preventDefault();
		RouteActionCreators.redirect('feedback');
	},

	render: function() {
		return (
			<div className = "row">
				<br/>
				<div className = "feedback__thanks">
					Thank you for your feedback!
				</div>
				<br/>
				<form onSubmit={this._onPress} className="feedback__new">
					<div className="feedback__new">
						<button type="submit">New Feedback</button>
					</div>
				</form>
			</div>
		);
	}
});

module.exports = FeedbackThanks;