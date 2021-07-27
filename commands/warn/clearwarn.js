const mongo = require("../../mongo");
const warnSchema = require("../../schemas/warn-schema");

/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['cw', 'clearwarn'],
	permissions: 'KICK_MEMBERS',
	permissionError: 'You do not have permissions to execute this command!',
	callback: async (message, args, text, client) => {
		const target = message.mentions.users.first();
		if (!target) return message.reply('You have to mention someone!');
		const guildId = message.guild.id;
		const userId = target.id;
		await mongo().then(async (mongoose) => {
			await warnSchema.findOne({
				guildId,
				userId,
			}, async (err, data) => {
				if (err) throw err;
				if (data) {
					let number = parseInt(args[1]) - 1;
					data.content.splice(number, 1);
					message.channel.send('Successfully deleted the warn!');
				}
				else {
					message.channel.send('The user does not have any data!');
				}
			});
		});
	},
};