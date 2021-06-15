/* eslint-disable no-unused-vars */
const mongo = require("../../mongo");
const AutoRoleSchema = require("../../schemas/autorole-schema");

module.exports = {
	commands: ["autorole"],
	minArgs: 1,
	maxArgs: 1,
	permissions: "KICK_MEMBERS",
	permissionError:
	'You need to have the permission "KICK MEMBERS" to set an autorole and pls make sure to have membership screening enabled',
	callback: async (message, args, text, client) => {
		const autorole = message.mentions.roles.first();
		if (!autorole) {
			message.reply("Please specify a role!");
		}
	},
};
