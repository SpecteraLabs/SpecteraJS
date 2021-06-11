/* eslint-disable no-unused-vars */
const mongo = require('../../mongo');
const warnSchema = require('../../schemas/warn-schema');
const Discord = require('discord.js');

module.exports = {
	commands: ['listwarnings', 'lw', 'listwarns'],
	minArgs: 1,
	expectedArgs: "<Target user's @>",
	permissions: 'KICK_MEMBERS',
	permissionError: 'You must have `Kick Members` Permission(s) to run this command',
	callback: async (message, args, text) => {
		const target = message.mentions.users.first();
		if (!target) {
			message.reply('Please specify a user to load the warnings for.');
			return;
		}

		const guildId = message.guild.id;
		const userId = target.id;

		await mongo().then(async (mongoose) => {
			try {
				const results = await warnSchema.findOne({
					guildId,
					userId,
				});
				if (results) {
					let reply = ``;
					let i = 0;
					let x = 0;
					for (const warning of results.warnings) {
						const { author, timestamp, reason } = warning;
						x += 1;
						reply += `**Warning number:** ${x}\n**Responsible Moderator:** ${author}\n **Date:** ${new Date(
							timestamp,
						).toLocaleDateString()}\n **Reason:** "${reason}"\n\n`;
						i += 1;
					}
					const hmm = new Discord.MessageEmbed()
						.setColor('#fc030b')
						.setTitle(`${target.tag}'s warnings`)
						.setDescription(`**__Warnings__** : ${i}\n ${reply}`)
						.setFooter(`Requested by ${message.author.tag}`)
						.setTimestamp();
					message.reply({ embed: hmm });
				}
				else {
					message.reply(`No warnings found for ${target.tag}`, { allowedMentions: { repliedUser: false } });
				}
			}
			finally {
				mongoose.connection.close();
			}
		});
	},
};