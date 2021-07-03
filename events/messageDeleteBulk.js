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
		const embed = new MessageEmbed()
			.setTitle(`Message bulk deleted in #${ms.channel.name}`)
			.setColor(`${client.colors.error}`)
			.setTimestamp();
		for (const message of messages.values()) {
			if (message.partial) return;
			embed.addField(`\u200B`, `**${message.author.tag}**: ${message.content}\n`);
		}
		const channel = ms.guild.channels.cache.find(ch => ch.id === result.channelId);
		channel.send({ embeds: [embed] });
	},
};
