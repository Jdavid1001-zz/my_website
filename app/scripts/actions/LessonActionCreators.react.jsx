var Dispatcher = require('../dispatcher/SuperclassDispatcher.js');
var Constants = require('../constants/SuperclassConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = Constants.ActionTypes;

LessonActionCreators = {
  loadLessons: function() {
    Dispatcher.handleViewAction({
      type: ActionTypes.LOAD_LESSONS
    });
    WebAPIUtils.loadLessons();
  },

  loadLesson: function(lessonId) {
    Dispatcher.handleViewAction({
      type: ActionTypes.LOAD_LESSON,
      lessonId: lessonId
    });
    WebAPIUtils.loadLesson(lessonId);
  },

  createLesson: function(title, creator, link, summary) {
    Dispatcher.handleViewAction({
      type: ActionTypes.CREATE_LESSON,
      title: title,
      creator: creator,
      link: link,
      summary: summary
    });
    WebAPIUtils.createLesson(title, creator, link, summary);
  }
};

module.exports = LessonActionCreators;
