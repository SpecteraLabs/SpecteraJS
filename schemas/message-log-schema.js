const mongoose = require('mongoose');

const messageLogSchema = mongoose.Schema({
	_id: {
		type: String,
		required: true,
	},

	channelId: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('message-log-channels', messageLogSchema);