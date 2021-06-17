/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['createrole', 'crole'],
	minArgs: 1,
	permissions: 'MANAGE_ROLES',
	permissionError: 'You donot have permissions to create a role!',
	callback: async (message, args, text, client) => {
		const reason = args.join(' ').slice(22);
		if (!args[0]) {
			message.reply(`+crole RoleName RoleColor Mentionable(true/false)
								  ^^^^^^^^
								  RoleName is a required Argument
			`);
		}
		if (!args[1]) {
			await message.guild.roles.create({
				name: `${args[0]}`,
			});
			const rolie = message.guild.roles.cache.find(r => r.name === args[0]);
			message.reply(`Succesuflly created role **${rolie.name}**`);
		}
		else if (!args[1].startsWith('#')) {
			message.reply(`You need to specify a hex! or dont include a color`);
		}
		if (!args[2]) {
			await message.guild.roles.create({
				name: args[0],
				color: args[1],
			});
			const rolie = message.guild.roles.cache.find(r => r.name === args[0]);
			message.reply(`Succesuflly created role **${rolie.name}**`);
		}
		else if (args[2].toLowerCase() === 'true' || args[2].toLowerCase() === 'false') {
			await message.guild.roles.create({
				name: args[0],
				color: args[1],
				mentionable: args[2].toLowerCase(),
			});
			const rolie = message.guild.roles.cache.find(r => r.name === args[0]);
			message.reply(`Succesuflly created role **${rolie.name}**`);
		}
		else if (!args[2].toLowerCase() === 'true' || !args[2].toLowerCase() === 'false') {
			message.reply('You need to choose either true or false as third argument');
		}
	},
};