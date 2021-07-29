const { MessageEmbed } = require('discord.js');
const messageLogSchema = require('../schemas/message-log-schema');

module.exports = {
	name: 'messageUpdate',
	execute: async (oldMessage, newMessage, client) => {
		if (newMessage.partial || oldMessage.partial) return;
		const wasMessage = oldMessage.content;
		const isMessage = newMessage.content;
		const guildId = newMessage.guild.id;
		const result = await messageLogSchema.findOne({ _id: guildId });
		if (!result) return;
		if (newMessage.fetchWebhook) return;
		const ochannel = newMessage.guild.channels.cache.find(ch => ch.id === result.channelId);
		const embed = new MessageEmbed()
			.setAuthor(newMessage.author.tag, newMessage.author.displayAvatarURL())
			.setTitle(`Message edited in #${newMessage.channel.name}`)
			.setDescription(`**Before:** ${wasMessage}\n**After:** ${isMessage}`)
			.setColor(`${client.colors.error}`)
			.setFooter(`ID: ${newMessage.member.user.id}`)
			.setTimestamp();
		ochannel.send({ embeds: [embed] });
	},
};