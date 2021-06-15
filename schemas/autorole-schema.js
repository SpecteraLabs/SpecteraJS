const mongoose = require('mongoose');

const AutoRoleSchema = mongoose.Schema({
	guildId: {
		type: String,
		required: true,
	},
	roleId: {
		type: String,
		required: true,
	},
});
module.exports = mongoose.model('autorole', AutoRoleSchema);