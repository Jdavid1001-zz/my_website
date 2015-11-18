var React = require('react');
// doesn't look like we need the dispatcher
// var Dispatcher = require('../../dispatcher/SuperclassDispatcher.js');

var SessionStore = require('../../stores/SessionStore.react.jsx');
var ProjectActionCreators = require('../../actions/ProjectActionCreators.react.jsx');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');

var ProjectNew = React.createClass({

	componentDidMount: function() {
		// prevent non-admins from creating project pages
		if (!SessionStore.isAdmin()) {
			RouteActionCreators.redirect('app');
		}
	},

	_onSubmit: function(e) {
		e.preventDefault();
		var title = this.refs.title.getDOMNode().value;
		var difficulty = this.refs.difficulty.getDOMNode().value;
		var utility_of_final_result = this.refs.utility_of_final_result.getDOMNode().value;
		var description = this.refs.description.getDOMNode().value;
		ProjectActionCreators.createProject(title, difficulty,utility_of_final_result,description);
	},

	_onCancel: function(e) {
		e.preventDefault();
		RouteActionCreators.redirect('projects');
	},

	render: function() {
		// return (<div>POOOOOOOOOOOOOOOOOOOOOOOOOP</div>);

		return (
			<div className="row">
				<br/>
				<form onSubmit={this._onSubmit} className="new-project">
					<div className="new-project__title">
						<input type="text" placeholder="Title" name="title" ref="title" />
					</div>
					<div className="new-project__difficulty">
						<input type="text" placeholder="Difficulty (1-10, 1 being easiest and 10 being hardest" name="difficulty" ref="difficulty" />
					</div>
					<div className="new-project__utility_of_final_result">
						<input />
					</div>
					<div className="new-project__description">
						<textarea rows="10" input type="text" placeholder="Please provide a summary of the project" name="body" ref="body" />
					</div>
					<div className="new-project__submit">
						<button type="submit">Post Project</button>
					</div>
				</form>
				<form onSubmit={this._onCancel} className="cancel-project">
					<button type="submit">Cancel</button>
				</form>
			</div>
		);
	}
});

module.exports = ProjectNew;
// title,difficulty,utility_of_final_result, description
/*
//<input type="range" min="0" max="50" value="0" step="5" onchange="showValue(this.value)" />
<input type="range" min="0" max="10" value="5" onchange="showValue(this.value)" name="difficulty" ref="difficulty" />
<span id="range">0</span>
<script type="text/javascript">
function showValue(newValue)
{
	document.getElementById("range").innerHTML=newValue;
}
</script>
// here's stuff for difficulty, in case slider doesn't work
// <input type="text" placeholder="Difficulty (1-10, 1 being easiest and 10 being hardest" name="difficulty" ref="difficulty" />

*/