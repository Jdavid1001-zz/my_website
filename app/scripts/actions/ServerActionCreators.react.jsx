//ServerActionCreators.react.jsx

var SuperclassDispatcher = require('../dispatcher/SuperclassDispatcher.js');
var SuperclassConstants = require('../constants/SuperclassConstants.js');

var ActionTypes = SuperclassConstants.ActionTypes;

ActionCreator = {

	receiveLogin: function (jsonLoginInfo, errors) {
		SuperclassDispatcher.handleServerAction({
			type: ActionTypes.LOGIN_RESPONSE,
			json: jsonLoginInfo,
			errors: errors
		});
	},

  receiveLessons: function (json) {
    SuperclassDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_LESSONS,
      json: json
    });
  },

  receiveLesson: function (json) {
    SuperclassDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_LESSON,
      json: json
    });
  },

  receiveCreatedLesson: function (json, errors){
    SuperclassDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_CREATED_LESSON,
      json: json,
      errors: errors
    });
  },
  
  receiveQuestions: function(json) {
    SuperclassDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_QUESTIONS,
      json: json
    });
  },

  receiveQuestion: function(json){
    SuperclassDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_QUESTION,
      json: json
    })
  },

  receiveCreatedQuestion: function(json, errors){
    SuperclassDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_CREATED_QUESTION,
      json: json,
      errors: errors
    });
  },

  receiveCreatedComment: function(json, errors){
    SuperclassDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_CREATED_COMMENT,
      json: json,
      errors: errors
    });
  }
};

module.exports = ActionCreator;
