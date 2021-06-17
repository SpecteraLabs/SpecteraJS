/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
module.exports = {
	commands: ['kick'],
	minArgs: 2,
	permissions: 'KICK_MEMBERS',
	permissionError: 'You do not have permissions to kick members!',
	callback: (message, args, text, client) => {
		const reason = args.join(' ').slice(22);
		const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.displayName === args[0]) || message.guild.members.cache.find(r => r.user.tag === args[0]);
		const succEmbed = new MessageEmbed()
			.setTitle('<a:SuccessTicko:853277905025892382> Success')
			.setTimestamp()
			.setColor('#44CF6C')
			.setDescription(`Successfully kicked **${message.mentions.members.first()}**!`)
			.setFooter(`Kicked by ${message.author.tag}`, message.author.displayAvatarURL());
		if (target) {
			try {
				target.kick(reason);
				client.setTimeout(() => message.delete(), 10);
				message.reply({ embeds : [succEmbed], allowedMentions: { repliedUser: false } })
					.then(msg => {
						client.setTimeout(() => msg.delete(), 5000);
					});
			}
			catch {
				message.reply(`I do not have permissions to kick **${target.user.tag}**`);
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