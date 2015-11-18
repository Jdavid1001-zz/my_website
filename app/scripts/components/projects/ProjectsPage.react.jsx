var React = require('react');
var ProjectStore = require('../../stores/ProjectStore.react.jsx');
var ProjectActionCreators = require('../../actions/ProjectActionCreators.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var Router = require('react-router');
var Link = Router.Link;
var timeago = require('timeago');

var ProjectsPage = React.createClass({

  getInitialState: function(){
	  return {
	    projects: ProjectStore.getAllProjects(),
	    errors: []
	  };
  },

  componentDidMount: function() {
  	// adds this._onChange method to component, which sets state in sessionStores
		ProjectStore.addChangeListener(this._onChange);
		ProjectActionCreators.loadProjects();
  },

  componentWillUnmount: function() {
  	ProjectStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
  	this.setState({
  		projects: ProjectStore.getAllProjects(),
  		errors: ProjectStore.getErrors()
  	});
  },

  render: function() {
  	// only let admins add projects
  	var newProjectButton = SessionStore.isAdmin() ? (
  		<div className="large-3 medium-10 small-12 small-centered column">
  			<Link to="new-project">New Projects</Link>
			</div>
		) : (
			<div className="large-3 medium-10 small-12 small-centered column">
				<strong>You must be logged in as an administrator to add a project</strong>
			</div>
		);
		var errors = (this.state.errors.length > 0) ?
			<ErrorNotice errors={this.state.errors}/> : <div></div>;
		return (
			<div>
				{ errors }
				<br/>
				{newProjectButton}
				<br/>
				<div className="row">
					<ProjectsList projects={this.state.projects} />
				</div>
			</div>
		);
  }
});

var ProjectItem = React.createClass({
	render: function() {
		// spits out html to display a single project
		return(
			<li className="project">
				<div className="project__title">
					<Link to="project" params={ {projectId: this.props.project.id} }>
						{this.props.project.title} // curly braces allow us to insert JS into HTML
					</Link>
				</div>
				// <div className="project__info">
					// Author: {this.props.project.user} //, Created: {timeago(this.props.project.created_at)}, 
				// </div>
				<div className="project__description">
					{this.props.project.description}
				</div>
			</li>
			);
	}
});

var ProjectsList = React.createClass({
	// html to display the list of projects
	// NOTE: WE MAY WANT TO SORT BY SOMETHING OTHER THAN JUST THE INDEX.  MAYBE
	// USE DIFFICULTY INSTEAD
	render: function() {
		return(
			<ul className="large-8 medium-10 small-12 small-centered column">
				{this.props.projects.map(function(project, index){
					return <ProjectItem project={project} key={"project-" + index}/>
				})}
			</ul>
		);
	}
});

module.exports = ProjectsPage;