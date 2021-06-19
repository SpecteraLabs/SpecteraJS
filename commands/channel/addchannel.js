/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['newchannel', 'nc'],
	permissions: 'MANAGE_CHANNELS',
	minArgs: 1,
	permissionError: 'You cannot create channels in this server!',
	callback: async (message, args, text, client) => {
		const name = args[0];
		const alreadythere = message.guild.channels.cache.find(c => c.name === name);
		if (alreadythere) return message.reply('There is already a channel with that name , please choose a different name');
		await message.guild.channels.create(name, {
			type: args[1],
			parent: args[2],
		}).then((channel) => message.reply(`${channel} is ready!`));
	},
};