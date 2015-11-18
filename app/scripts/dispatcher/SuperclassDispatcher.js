//SuperclassDispatcher.js

var SuperclassConstants = require('../constants/SuperclassConstants.js');
var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var PayloadSources = SuperclassConstants.PayloadSources;

var SuperclassDispatcher = assign(new Dispatcher(),{
	handleServerAction: function(action){
		var payload = {
		source: PayloadSources.SERVER_ACTION,
		action: action
		};
		this.dispatch(payload);
	},
	handleViewAction: function(action) {
		var payload = {
			source: PayloadSources.VIEW_ACTION,
			action: action
		};
		this.dispatch(payload)
	}

});

module.exports = SuperclassDispatcher;