/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['unmute'],
	minArgs: 1,
	permissions: 'MANAGE_ROLES',
	callback: async (message, args, text, client) => {
		const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.displayName === args[0]) || message.guild.members.cache.find(r => r.user.tag === args[0]);
		const muterole = message.guild.roles.cache.find(r => r.name === 'Muted');
		if (target.roles.cache.find(r => r.name === 'Muted')) {
			target.roles.remove(muterole);
			message.channel.send(`Alright unmuted **${target.user.tag}**`);
		}
		else {
			message.reply('The user is not muted');
		}
	},
};