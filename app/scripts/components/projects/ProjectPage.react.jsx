var React = require('react');
var ProjectStore = require('../../stores/ProjectStore.react.jsx');
var ProjectActionCreators = require('../../actions/ProjectActionCreators.react.jsx');
var State = require('react-router').State;

// var project_id;

var ProjectPage = React.createClass({

	mixins: [ State ],

	getInitialState: function() {
		return {
			project: ProjectStore.getProject(),
			errors: []
		};
	},

	componentDidMount: function() {
		ProjectStore.addChangeListener(this._onChange);
		ProjectActionCreators.loadProject(this.getParams().projectId);
	},

	componentWillUnmount: function() {
		ProjectStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({
			project: ProjectStore.getProject(),
			errors: ProjectStore.getErrors()
		});
	},

	render: function() {
		// project_id = this.getParams().projectId;
		return (
			<div className="row">
				<div className="project__title"><strong>{this.state.project.title}</strong></div>
				<div className="project__difficulty">{this.state.project.difficulty}</div>
				<br/>
				<div className="project__utility_of_final_result">{this.state.project.utility_of_final_result}</div>
				<br/>
				<div className="project__description">{this.state.project.description}</div>
			</div>
		);
	}
});

module.exports = ProjectPage;