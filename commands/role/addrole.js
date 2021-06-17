/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['addrole'],
	minArgs: 2,
	permissions: 'MANAGE_ROLES',
	permissionError: 'You do not have permission to run this command',
	callback: async (message, args, text, client) => {
		const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
	},
};