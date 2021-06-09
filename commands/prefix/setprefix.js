/* eslint-disable no-unused-vars */
const mongo = require('../../mongo');
const commandPrefixSchema = require('../../schemas/command-prefix-schema');

const commandBase = require('../command-base');

module.exports = {
	commands: 'setprefix',
	minArgs: 1,
	maxArgs: 3,
	expectedArgs: '<This bot\'s new command prefix>',
	permissionError: 'You must be an admin to run this command.',
	permissions: 'ADMINISTRATOR',
	callback: async (message, args, text) => {
		await mongo().then(async (mongoose) => {
			try {
				const guildId = message.guild.id;
				const prefix = args[0];

				await commandPrefixSchema.findOneAndUpdate(
					{
						_id: guildId,
					},
					{
						_id: guildId,
						prefix,
					},
					{
						upsert: true,
					},
				);

				message.reply(`The prefix for this bot is now ${prefix}`);

				// Update the cache
				commandBase.updateCache(guildId, prefix);
			}
			finally {
				mongoose.connection.close();
			}
		});
	},
};