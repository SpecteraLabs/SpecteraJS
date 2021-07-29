const { MessageEmbed } = require('discord.js');
const messageLogSchema = require('../schemas/message-log-schema');
module.exports = {
	name: 'messageDelete',
	execute: async (message, client) => {
		if (message.partial) {
			// do nothing
		}
		else {
			client.snipes.set(message.channel.id, {
				content: message.content,
				author: message.author.tag,
				member: message.member,
				image: message.attachments.first() ? message.attachments.first().proxyURL : null,
			});
			const guildId = message.guild.id;
			const result = await messageLogSchema.findOne({ _id: guildId });
			if (!result) return;
			const ochannel = message.guild.channels.cache.find(ch => ch.id === result.channelId);
			const embed = new MessageEmbed()
				.setAuthor(message.author.tag, message.member.user.displayAvatarURL())
				.setTitle(`Message deleted in #${message.channel.name}`)
				.setDescription(message.content)
				.setColor(`${client.colors.error}`)
				.setFooter(`ID: ${message.member.user.id}`)
				.setTimestamp();
			if (message.image) embed.setImage(message.image);
			ochannel.send({ embeds: [embed] });
		}
	},
};