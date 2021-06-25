/* eslint-disable no-unused-vars */
const mongo = require("../mongo");
const AutoRoleSchema = require("../schemas/auto-role-schema");
module.exports = {
	name: "guildMemberAdd",
	execute: async (member, client) => {
		await mongo().then(async (mongoose) => {
			try {
				const result = AutoRoleSchema.findOne({ _id: member.guild.id });
				const role = member.guild.roles.cache.find((r) => r.name === result);
			}
			finally {
				mongoose.connection.close();
			}
		});
	},
};
