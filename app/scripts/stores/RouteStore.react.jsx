var Dispatcher = require('../dispatcher/SuperclassDispatcher.js');
var Constants = require('../constants/SuperclassConstants.js');
var SessionStore = require('../stores/SessionStore.react.jsx');
var LessonStore = require('../stores/LessonStore.react.jsx');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var Router = require('react-router');
var routes = require('../routes.jsx');

var router = Router.create({
  routes: routes,
  location: null // Router.HistoryLocation
});

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var RouteStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  getRouter: function() {
    return router;
  },

  redirectHome: function() {
    router.transitionTo('app');
  }
});

RouteStore.dispatchToken = Dispatcher.register( function(payload) {
  Dispatcher.waitFor([
    SessionStore.dispatchToken,
    LessonStore.dispatchToken
  ]);

  var action = payload.action;

  switch(action.type) {

    case ActionTypes.REDIRECT:
      router.transitionTo(action.route);
      break;

    case ActionTypes.LOGIN_RESPONSE:
      if (SessionStore.isLoggedIn()) {
        router.transitionTo('app');
        // Dirty hack, need to figure this out
        $(document).foundation();
      }
      break;

    case ActionTypes.RECEIVE_CREATED_LESSON:
      router.transitionTo('lessons');
      break;

    case ActionTypes.RECEIVE_CREATED_QUESTION:
      router.transitionTo('questions');
      break;
      
    default:
  }
});

module.exports = RouteStore;
