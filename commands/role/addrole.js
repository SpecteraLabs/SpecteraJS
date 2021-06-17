/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['addrole', 'role add'],
	minArgs: 2,
	permissions: 'MANAGE_ROLES',
	permissionError: 'You do not have permission to run this command',
	callback: async (message, args, text, client) => {
		const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.displayName === args[0]) || message.guild.members.cache.find(r => r.user.tag === args[0]);
		const trole = message.mentions.members.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(r => r.name === args[1]) || message.guild.roles.cache.find(r => r.user.tag === args[1]);
		if (!target && !args[0]) return message.reply('You need to either tag or specify id or specify tag of a user!');
		if (!args[1]) return message.reply('You need to specify a role!');
		if (!trole) return message.reply('Could not find that role!');
		if (target.user.roles.cache.has(trole)) return message.reply(`Cannot add role to **${target.user.tag}** because they alreadt have it`);
		try {
			target.roles.add(trole);
			message.reply(`Alright added role **${trole.name}** to **${target.user.tag}**`);
		}
		catch {
			message.reply(`I could not add **${trole.name}** to **${target.user.tag}**`);
		}
	},
};