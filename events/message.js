/* eslint-disable no-unused-vars */
const mongo = require("../mongo");
const AutoRoleSchema = require("../schemas/auto-role-schema");
module.exports = {
	name: "message",
	execute: async (message) => {
		await mongo().then(async (mongoose) => {
			try {
				const result = await AutoRoleSchema.findOne({ _id: message.guild.id });
				if (result) {
					const role = message.guild.roles.cache.find(r => r.id === result.roleId);
					if (!message.member.roles.cache.some(r => r === role)) {
						message.member.roles.add(role);
					}
					if (message.member.roles.cache.some(r => r === role) || message.webhookId) return;
				}
			}
			finally {
				mongoose.connection.close();
			}
		});
	},
};
