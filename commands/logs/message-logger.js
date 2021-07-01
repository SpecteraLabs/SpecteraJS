/* eslint-disable no-unused-vars */
const mongo = require("../../mongo");
const messageLogSchema = require("../../schemas/message-log-schema");
const Discord = require('discord.js');

module.exports = {
	commands: ['messagelogs', 'mlogs'],
	minArgs: 1,
	expectedArgs: '<channel>',
	permission: 'ADMINISTRATOR',
	permissionError: 'You cannot set message log channel!',
	callback: async (message, args, text, client) => {
		if (!args.length) return;
		const target = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
		if (!target) return message.reply('Couldn\'t find that channel');
		const guildId = message.guild.id;
		await mongo().then(async (mongoose) => {
			await messageLogSchema.findOneAndUpdate({
				_id: guildId,
			},
			{
				_id: guildId,
				channelId: target.id,
			},
			{
				upsert: true,
			});
			const succEmbed = new Discord.MessageEmbed()
				.setDescription(`${client.emotes.success} Message logging channel for this server now is ${target}`)
				.setColor(client.colors.success)
				.setTimestamp();
			message.reply({ embeds: [succEmbed], allowedMentions: { repliedUser: false } });
		});
	},
};