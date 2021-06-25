const mongoose = require("mongoose");

const AutoRoleSchema = mongoose.Schema({
	_id: {
		type: String,
		required: true,
	},

	roleId: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("autorole-system", AutoRoleSchema);
