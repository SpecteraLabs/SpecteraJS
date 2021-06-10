/* eslint-disable no-unused-vars */
const mongo = require('../../mongo');
const warnSchema = require('../../schemas/warn-schema');

module.exports = {
	commands: ['cwarn', 'clearwarn', 'cw'],
	minArgs: 1,
	expectedArgs: "<Target user's @>",
	permissions: 'KICK_MEMBERS',
	permissionError: 'You must have `Kick Members` Permission(s) to run this command',
	callback: async (message, args, text, client) => {
		const target = message.mentions.users.first();
		if (!target) {
			message.reply('Please specify someone to warn.');
			return;
		}

		args.shift();

		const guildId = message.guild.id;
		const userId = target.id;
		await mongo().then(async (mongoose) => {
			await warnSchema.findOne({
				guildId,
				userId,
			}, async (err, data) => {
				if (err) throw err;
				if (data) {
					await warnSchema.findOneAndRemove({
						userId,
						guildId,
					});
					message.channel.send(`Cleared ${target.tag}'s warnings `);
				}
				else {
					message.channel.send('I could not find any warnings for ' + target.tag);
				}
			});
		});
	},
};