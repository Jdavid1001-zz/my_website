//SessionStore.react.jsx
var SuperclassDispatcher = require('../dispatcher/SuperclassDispatcher.js');
var SuperclassConstants = require('../constants/SuperclassConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = SuperclassConstants.ActionTypes;
var CHANGE_EVENT = 'change';

// Load an access token from the session storage, you might want to implement
// a 'remember me' using localStorage
var _accessToken = sessionStorage.getItem('accessToken');
var _email = sessionStorage.getItem('email');
var _role = sessionStorage.getItem('role');
var _user = sessionStorage.getItem('user');
var _errors = [];

var SessionStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isLoggedIn: function() {
    return _accessToken ? true : false;
  },

  getAccessToken: function() {
    return _accessToken;
  },

  getEmail: function() {
    return _email;
  },

  getRole: function() {
    return _role;
  },

  getUser: function() {
    return _user;
  },

  isAdmin: function() {
    return (this.isLoggedIn() && _role == 'admin') ? true : false;
  },

  getErrors: function() {
    return _errors;
  }

});

SessionStore.dispatchToken = SuperclassDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.LOGIN_RESPONSE:
      if (action.json && action.json.access_token) {
        _accessToken = action.json.access_token;
        _email = action.json.email;
        _role = action.json.role;
        _user = action.json.username;
        // Token will always live in the session, so that the API can grab it with no hassle
        sessionStorage.setItem('accessToken', _accessToken);
        sessionStorage.setItem('email', _email);
        sessionStorage.setItem('role', _role);
        sessionStorage.setItem('user', _user);
      }
      if (action.errors) {
        _errors = action.errors;
      }
      SessionStore.emitChange();
      break;

    case ActionTypes.LOGOUT:
      _accessToken = null;
      _email = null;
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('user');
      SessionStore.emitChange();
      break;

    default:
  }

  return true;
});

module.exports = SessionStore;
