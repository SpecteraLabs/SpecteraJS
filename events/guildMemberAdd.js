/* eslint-disable no-unused-vars */
const mongo = require('../mongo');
const autoroleSchema = require('../schemas/autorole-schema');
module.exports = {
	name: 'guildMemberAdd',
	execute: async (member, client) => {
		await mongo().then(async (mongoose) => {
			try {
				const result = autoroleSchema.findOne({ _id: member.guild.id });
				const role = member.guild.roles.cache.find(r => r.name === result);
			}
			finally {
				mongoose.connection.close();
			}
		});
	},
};