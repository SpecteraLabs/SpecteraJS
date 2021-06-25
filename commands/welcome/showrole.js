/* eslint-disable no-unused-vars */
const mongo = require('../../mongo');
const autoroleSchema = require('../../schemas/autorole-schema');
module.exports = {
	commands: ['showrole', 'sr'],
	permissions: 'ADMINISTRATOR',
	permissionError: 'You do not have "ADMINISTRATOR" permission to run this command!',
	callback: async (message, args, text, client) => {
		await mongo().then(async (mongoose) => {
			try {
				const role = await autoroleSchema.findOne({ _id: message.guild.id });
				console.log(role);
			}
			finally {
				mongoose.connection.close();
			}
		});
	},
};