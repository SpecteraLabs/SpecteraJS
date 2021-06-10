/* eslint-disable no-unused-vars */
const mongo = require('../../mongo');
const warnSchema = require('../../schemas/warn-schema');

module.exports = {
	commands: ['listwarnings', 'lw'],
	minArgs: 1,
	expectedArgs: "<Target user's @>",
	permissions: 'KICK_MEMBERS',
	permissionError: 'You must have kick permissions to run this command',
	callback: async (message, args, text) => {
		const target = message.mentions.users.first();
		if (!target) {
			message.reply('Please specify a user to load the warnings for.');
			return;
		}

		const guildId = message.guild.id;
		const userId = target.id;

		await mongo().then(async (mongoose) => {
			try {
				const results = await warnSchema.findOne({
					guildId,
					userId,
				});

				let reply = ``;

				for (const warning of results.warnings) {
					const { author, timestamp, reason } = warning;

					reply += `By ${author} on ${new Date(
						timestamp,
					).toLocaleDateString()} for "${reason}"\n\n`;
				}

				message.reply(reply);
			}
			finally {
				mongoose.connection.close();
			}
		});
	},
};