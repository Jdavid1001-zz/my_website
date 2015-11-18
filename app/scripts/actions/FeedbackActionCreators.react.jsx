var WebAPIUtils = require('../utils/WebAPIUtils.js');

FeedbackActionCreators = {
	sendFeedback: function(body) {
		WebAPIUtils.sendFeedback(body);
	}
};

module.exports = FeedbackActionCreators;