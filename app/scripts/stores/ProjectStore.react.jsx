var Dispatcher = require('../dispatcher/SuperclassDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/SuperclassConstants.js');
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change'; // constant that we'll reuse

// initialize the arrays to hold project and error data
var _projects = [];
var _errors = [];

// NOTE: THESE FIELDS ARE JUST PLACEHOLDERS/SUGGESTIONS THAT I INSERTED TO HAVE
// SOMETHING IN THE ARRAY SO THAT WE COULD WORK WITH THE PROJECTS PAGE
var _project = { title:"", difficulty:"", utility_of_final_result:"", description:"" };

var ProjectStore = assign({}, EventEmitter.prototype, {

	emitChange: function() {
			this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT,callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT,callback);
	},

	getAllProjects: function(callback) {
		return _projects;
	},

	getProject: function() {
		return _project;
	},

	getErrors: function() {
		return _errors;
	},
});

ProjectStore.dispatchToken = Dispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.type) {

		case ActionTypes.RECEIVE_PROJECTS:
			_projects = action.json.projects;
			ProjectStore.emitChange();
			break;

		case ActionTypes.RECEIVE_CREATED_PROJECT:
			if (action.json) {
				// adds action.json.project to beginning of _projects array
				_projects.unshift(action.json.project);
				_errors = [];
			}
			if (action.errors) { // if bad things happened
				_errors = action.errors;
			}
			ProjectStore.emitChange();
			break;

		case ActionTypes.RECEIVE_PROJECT:
			if (action.json) {
				_project = action.json.project;
				_errors = [];
			}
			if (action.errors) {
				_errors = action.errors;
			}
			ProjectStore.emitChange();
			break;
	}
	return true; // seems to be a filler (because we must return something???) 
});

module.exports = ProjectStore;