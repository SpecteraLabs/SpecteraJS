/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");
const messageLogSchema = require("../schemas/message-log-schema");
module.exports = {
	name: 'messageDeleteBulk',
	execute: async (messages, client) => {
		const ms = messages.first();
		const guildId = ms.guild.id;
		const result = await messageLogSchema.findOne({ _id: guildId });
		if (!result) return;
		let value = '';
		let count = 0;
		const embed = new MessageEmbed()
			.setColor(`${client.colors.error}`)
			.setTimestamp();
		for (const message of messages.values()) {
			if (message.partial) return;
			count++;
			embed.setTitle(`${count} messages purges in #${ms.channel.name}`);
			value += `[${message.author.tag}]: ${message.content}\n`;
			embed.setDescription(`${value}`);
		}
		const channel = ms.guild.channels.cache.find(ch => ch.id === result.channelId);
		channel.send({ embeds: [embed] });
	},
};
