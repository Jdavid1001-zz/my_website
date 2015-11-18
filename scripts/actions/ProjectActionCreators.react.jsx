var Dispatcher = require('../dispatcher/SuperclassDispatcher.js');
var Constants = require('../constants/SuperclassConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = Constants.ActionTypes;

ProjectActionCreators = {
	loadProjects: function() {
		Dispatcher.handleViewAction({
			type: ActionTypes.LOAD_PROJECTS
		});
		WebAPIUtils.loadProjects();
	},

	loadProject: function(projectId) {
		Dispatcher.handleViewAction({
			type: ActionTypes.LOAD_PROJECT,
			projectId: projectId
		});
		WebAPIUtils.loadProject(projectId);
	},

	createProject: function(title,difficulty,utility_of_final_result, description){
		Dispatcher.handleViewAction({
			type: ActionTypes.CREATE_PROJECT,
			title: title,
			difficulty: difficulty,
			utility_of_final_result: utility_of_final_result,
			description: description
		});
		WebAPIUtils.createProject(title,difficulty,utility_of_final_result, description);
	}
};

module.exports = ProjectActionCreators;