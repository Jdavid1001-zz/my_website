var React = require('react');
var QuestionActionCreators = require('../../actions/QuestionActionCreators.react.jsx');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');

var QuestionNew = React.createClass({

	componentDidMount: function() {
    	if (!SessionStore.isLoggedIn()) {
      	RouteActionCreators.redirect('app');
    	}
  	},

	_onSubmit: function(e) {
		e.preventDefault();
		var title = this.refs.title.getDOMNode().value;
		var body = this.refs.body.getDOMNode().value;
		QuestionActionCreators.createQuestion(title, body);
	},

	_onCancel: function(e) {
		e.preventDefault();
		RouteActionCreators.redirect('questions');
	},

	render: function () {
		return (
			<div className="row">
				<br/>
				<form onSubmit={this._onSubmit} className="new-question">
					<div className="new-question__title">
						<input type="text" placeholder="Title" name="title" ref="title"/>
					</div>
					<div className="new-question__summary">
						<textarea rows="10" input type="text" placeholder="Write your question here" name="body" ref="body"/>
					</div>
					<div className="new-question__submit">
						<button type="submit">Post Question</button>
					</div>
				</form>
				<form onSubmit={this._onCancel} className="cancel-question">
					<button type="submit">Cancel</button>
				</form>
			</div>
		);
	}

});

module.exports = QuestionNew;