/* eslint-disable no-unused-vars */
const mongo = require('../../mongo');
const commandPrefixSchema = require('../../schemas/command-prefix-schema');

const commandBase = require('../command-base');

module.exports = {
	commands: 'setprefix',
	description: 'Changes bot\'s command for the server',
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: '<This bot\'s new command prefix>',
	permissionError: 'You must be an admin to run this command.',
	permissions: 'ADMINISTRATOR',
	callback: async (message, args, text, client) => {
		await mongo().then(async (mongoose) => {
			const guildId = message.guild.id;
			const prefi = args[0];
			const prefix = prefi.toLowerCase();

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

			message.reply(`The prefix for this bot is now ${prefi}`);
			message.guild.me.setNickname(`[${prefi}] Obligator`);
			message.channel.send(`I changed my nickname to [${prefi}] Obligator so that you can remember my prefix`);

			commandBase.updateCache(guildId, prefix);
		});
	},
};