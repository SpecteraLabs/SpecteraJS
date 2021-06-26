/* eslint-disable no-unused-vars */
const mongo = require('../../mongo');
const commandPrefixSchema = require('../../schemas/command-prefix-schema');

const commandBase = require('../command-base');

module.exports = {
	commands: ['removeprefix', 'rprefix'],
	description: 'Changes bot\'s command for the server',
	minArgs: 0,
	maxArgs: 1,
	permissionError: 'You must be an admin to run this command.',
	permissions: 'ADMINISTRATOR',
	callback: async (message, args, text, client) => {
		await mongo().then(async (mongoose) => {
			const guildId = message.guild.id;
			const prefix = "+";

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

			message.reply(`Alrighty mate, I removed my prefix, so now you can use my default prefix (${prefix})`);
			message.guild.me.setNickname(`[${prefix}] Obligator`);

			commandBase.updateCache(guildId, prefix);
		});
	},
};