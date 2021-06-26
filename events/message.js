/* eslint-disable no-unused-vars */
const mongo = require("../mongo");
const AutoRoleSchema = require("../schemas/auto-role-schema");
module.exports = {
	name: "message",
	execute: async (message, client) => {
		await mongo().then(async (mongoose) => {
			try {
				if (message.fetchWebhook) return;
				const guildId = message.guild.id;
				const result = await AutoRoleSchema.findOne({ _id: guildId });
				if (result != null) {
					const role = message.guild.roles.cache.find(r => r.id === result.roleId);
					if (!message.member.roles.cache.some(r => r === role)) {
						message.member.roles.add(role);
					}
					if (message.member.roles.cache.some(r => r === role)) return;
				}
			}
			finally {
				mongoose.connection.close();
			}
		});
	},
};
