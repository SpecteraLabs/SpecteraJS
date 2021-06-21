/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
module.exports = {
	commands: ['snipe'],
	permissions: 'VIEW_AUDIT_LOG',
	permissionError: 'YOu cannot snipe because you are missing permissions \"VIEW_AUDIT_LOG\"',
	callback: async (message, args, text, client) => {
		const msg = client.snipes.get(message.channel.id);
		if(!msg) return message.reply("Didn't find any deleted messages.");
		const embed = new MessageEmbed()
			.setAuthor(msg.author, msg.member.user.displayAvatarURL())
			.setDescription(msg.content)
			.setColor('RANDOM')
			.setFooter('Get sniped lol')
			.setTimestamp();
		if(msg.image)embed.setImage(msg.image);
		message.channel.send({ embeds : [embed] });
	},
};