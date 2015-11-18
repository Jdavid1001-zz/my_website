var Dispatcher = require('../dispatcher/SuperclassDispatcher');
var Constants = require('../constants/SuperclassConstants.js');

var ActionTypes = Constants.ActionTypes;

RouteActionCreators = {

  redirect: function(route) {
    Dispatcher.handleViewAction({
      type: ActionTypes.REDIRECT,
      route: route
    });
  }
};

module.exports = RouteActionCreators;
