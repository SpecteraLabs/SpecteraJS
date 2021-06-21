/* eslint-disable no-unused-vars */
const db = require('quick.db');
module.exports = {
	commands: ['autorole', 'ar'],
	permissions: 'ADMINISTRATOR',
	permissionError: 'You do not have "ADMINISTRATOR" permission to run this command!',
	callback: async (message, args, text, client) => {
		if (!args.length) return message.reply(`Usage , +autorole <role>`);
		let p = db.set(`autoRole_${message.guild.id}`, args.join(' ').trim());
		const arole = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name === args[0]);
		if (!arole) {
			message.reply('Invalid role!');
		}
		else {
			message.reply(`Server AutoRole is now ${args[0]}`);
		}
	},
};