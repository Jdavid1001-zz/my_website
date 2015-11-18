var Dispatcher = require('../dispatcher/SuperclassDispatcher.js');
var Constants = require('../constants/SuperclassConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = Constants.ActionTypes;

SessionActionCreators = {

  signup: function(email, username, password, passwordConfirmation) {
    Dispatcher.handleViewAction({
      type: ActionTypes.SIGNUP_REQUEST,
      email: email,
      username: username,
      password: password,
      passwordConfirmation: passwordConfirmation

    });
    WebAPIUtils.signup(email, username, password, passwordConfirmation);
  },

  login: function( email, password) {
    Dispatcher.handleViewAction({
      type: ActionTypes.LOGIN_REQUEST,
      email: email,
      password: password
    });
    WebAPIUtils.login(email, password);
  },

  logout: function() {
    Dispatcher.handleViewAction({
      type: ActionTypes.LOGOUT
    });
  }
};

module.exports = SessionActionCreators;
