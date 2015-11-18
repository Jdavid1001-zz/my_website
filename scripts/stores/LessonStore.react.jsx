var Dispatcher = require('../dispatcher/SuperclassDispatcher.js');
var Constants = require('../constants/SuperclassConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _lessons = [];
var _errors = [];
var _lesson = { title: "", link: "", creator: "", summary: "" };

var LessonStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    console.log(CHANGE_EVENT);
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllLessons: function() {
    return _lessons;
  },

  getLesson: function() {
    return _lesson;
  },

  getErrors: function() {
    return _errors;
  }

});


LessonStore.dispatchToken = Dispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_LESSONS:
      _lessons = action.json.lessons;
      LessonStore.emitChange();
      break;

    case ActionTypes.RECEIVE_CREATED_LESSON:
      if (action.json) {
        _lessons.unshift(action.json.lesson);
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      LessonStore.emitChange();
      break;

    case ActionTypes.RECEIVE_LESSON:
      if (action.json) {
        _lesson = action.json.lesson;
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      LessonStore.emitChange();
      break;
  }

  return true;
});

module.exports = LessonStore;
