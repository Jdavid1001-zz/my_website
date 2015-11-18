var React = require('react');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');
var FeedbackActionCreators = require('../../actions/FeedbackActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');

var FeedbackPage = React.createClass({

	componentDidMount: function() {
    	if (!SessionStore.isLoggedIn()) {
      		RouteActionCreators.redirect('app');
    	}
  	},

	_onSubmit: function(e) {
		e.preventDefault();
		var feedbackBody = this.refs.body.getDOMNode().value;
		FeedbackActionCreators.sendFeedback(feedbackBody);
		RouteActionCreators.redirect('feedback-thanks');
	},

	render: function() {
		return (
			<div className = "row">
				<br/>
				<div className = "feedback__header">
					We appreciate any feedback regarding our website.
				</div>
				<br/>
				<form onSubmit={this._onSubmit} className="feedback">
					<div className="feedback__body">
						<textarea rows="10" input type="text" placeholder="Write feedback here" name="body" ref="body"/>
					</div>
					<div className="feedback__submit">
						<button type="submit">Submit Feedback</button>
					</div>
				</form>
			</div>
		);
	}
});

module.exports = FeedbackPage;
