/* eslint-disable no-unused-vars */
const mongo = require('../../mongo');
const warnSchema = require('../../schemas/warn-schema');
const Discord = require('discord.js');

module.exports = {
	commands: ['listwarnings', 'lw'],
	minArgs: 1,
	expectedArgs: "<Target user's @>",
	permissions: 'KICK_MEMBERS',
	permissionError: 'You must have kick permissions to run this command',
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

				let reply = ``;
				let i = 0;
				let x = 0;
				for (const warning of results.warnings) {
					const { author, timestamp, reason } = warning;
					x += 1;
					reply += `Warning number : ${x}\nResponsible Moderator:\n ${author}\n Date:\n ${new Date(
						timestamp,
					).toLocaleDateString()}\n Reason: "${reason}"\n\n`;
					i += 1;
				}
				const hmm = new Discord.MessageEmbed()
					.setTitle(`${target.tag}'s warnings`)
					.setDescription(`Warnings : ${i}\n ${reply}`)
					.setTimestamp();
				message.reply({ embed: hmm });
			}
			finally {
				mongoose.connection.close();
			}
		});
	},
};