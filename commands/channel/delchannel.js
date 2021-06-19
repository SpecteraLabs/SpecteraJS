/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['delchan', 'deletechannel'],
	permissions: 'MANAGE_CHANNELS',
	minArgs: 1,
	permissionError: 'You cannot create channels in this server!',
	callback: async (message, args, text, client) => {
		const target = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
		if (!target) return message.reply('No channel found!');
		target.delete().then(() => message.reply('Succesfully deleted that channel!'));
	},
};