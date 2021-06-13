/* eslint-disable no-unused-vars */
const mongo = require('../../mongo');
const warnSchema = require('../../schemas/warn-schema');
const MessageEmbed = require('discord.js').MessageEmbed;

module.exports = {
	commands: ['cwarn', 'clearwarn', 'cw'],
	minArgs: 1,
	expectedArgs: "<Target user's @>",
	permissions: 'KICK_MEMBERS',
	permissionError: 'You must have `Kick Members` Permission(s) to run this command',
	callback: async (message, args, text, client) => {
		const target = message.mentions.users.first();
		if (!target) {
			message.reply('Please specify someone to warn.');
			return;
		}

		args.shift();

		const guildId = message.guild.id;
		const userId = target.id;
		await mongo().then(async (mongoose) => {
			await warnSchema.findOne({
				guildId,
				userId,
			}, async (err, data) => {
				if (err) throw err;
				if (data) {
					await warnSchema.findOneAndDelete({
						userId,
						guildId,
					});
					const successEmbed = new MessageEmbed()
						.setTitle('<a:SuccessTicko:853277905025892382> Done')
						.setDescription(`Successfully cleared warnings of ${target.tag}`)
						.setColor('#FFFFFF')
						.setTimestamp();
					message.channel.send({ embeds : [ successEmbed ], allowedMentions: { repliedUser: false } });
				}
				else {
					const errorEmbed = new MessageEmbed()
						.setTitle('<a:ErrorTicko:853278103794089985> Error')
						.setDescription(`I couldn't find any warnings for ${target.tag} `)
						.setColor('RED')
						.setTimestamp();
					message.channel.send({ embeds : [errorEmbed], allowedMentions: { repliedUser: false } });
				}
			});
		});
	},
};