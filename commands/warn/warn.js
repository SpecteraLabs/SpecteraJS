const mongo = require('../../mongo');
const warnSchema = require('../../schemas/warn-schema');

module.exports = {
	commands: 'warn',
	minArgs: 2,
	expectedArgs: "<Target user's @> <reason>",
	permissions: 'KICK_MEMBERS',
	permissionError: 'You must have kick permissions to run this command',
	callback: async (message, args) => {
		const target = message.mentions.users.first();
		if (!target) {
			message.reply('Please specify someone to warn.');
			return;
		}

		args.shift();

		const guildId = message.guild.id;
		const userId = target.id;
		const reason = args.join(' ');

		const warning = {
			author: message.member.user.tag,
			timestamp: new Date().getTime(),
			reason,
		};

		await mongo().then(async (mongoose) => {
			try {
				await warnSchema.findOneAndUpdate(
					{
						guildId,
						userId,
					},
					{
						guildId,
						userId,
						$push: {
							warnings: warning,
						},
					},
					{
						upsert: true,
					},
				);
			}
			finally {
				mongoose.connection.close();
			}
		});
	},
};