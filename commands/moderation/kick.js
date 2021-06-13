/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
module.exports = {
	commands: ['kick'],
	minArgs: 2,
	permissions: 'KICK_MEMBERS',
	permissionError: 'You do not have permissions to kick members!',
	callback: (message, args, text, client) => {
		const reason = args.join(' ').slice(22);
		const succEmbed = new MessageEmbed()
			.setTitle('<a:SuccessTicko:853277905025892382> Success')
			.setTimestamp()
			.setColor('GREEN')
			.setDescription(`Successfully kicked **${message.mentions.members.first()}**!`)
			.setFooter(`Kicked by ${message.author.tag}`, message.author.displayAvatarURL());
		if (message.mentions.members.first()) {
			try {
				message.mentions.members.first().kick(reason);
				client.setTimeout(() => message.delete(), 10);
				message.reply({ embeds : [succEmbed], allowedMentions: { repliedUser: false } })
					.then(msg => {
						client.setTimeout(() => msg.delete(), 5000);
					});
			}
			catch {
				message.reply(`I do not have permissions to kick **${message.mentions.members.first()}**`);
			}
		}
		else if (!reason) {
			message.reply('You have to specify a reason to ban!');
		}
		else {
			message.reply('You have to mention a user to kick');
		}
	},
};