const mongoose = require('mongoose');

const autoRoleSchema = mongoose.Schema({
	_id: {
		type: String,
		required: true,
	},

	roleId: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('autorole', autoRoleSchema);