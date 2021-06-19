/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['removerole', 'rrole'],
	minArgs: 2,
	permissions: 'MANAGE_ROLES',
	permissionError: 'You do not have permission to run this command',
	callback: async (message, args, text, client) => {
		const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.displayName === args[0]) || message.guild.members.cache.find(r => r.user.tag === args[0]);
		const trole = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(r => r.name === args[1]);
		if (!target && !args[0]) return message.reply('You need to either tag or specify id or specify tag of a user!');
		if (!args[1]) return message.reply('You need to specify a role!');
		if (!trole) return message.reply('Could not find that role!');
		if (!target.roles.cache.some(r => r.name === trole.name)) return message.reply(`Cannot remove role from **${target.user.tag}** because they don't even have it`);
		try {
			target.roles.remove(trole);
			message.reply(`Alright removed role **${trole.name}** from **${target.user.tag}**`);
		}
		catch {
			message.reply(`I could not remove **${trole.name}** from **${target.user.tag}**`);
		}
	},
};