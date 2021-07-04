/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['purge', 'prune', 'clean', 'clear'],
	minArgs: 1,
	maxArgs: 1,
	permissions: 'MANAGE_MESSAGES',
	permissionError: 'You cannot purge messages in this server!',
	callback: async (message, args, text, client) => {
		const amount = parseInt(args[0]);

		if (isNaN(amount)) {
			return message.reply('You need to enter a number to purge!');
		}
		else if (amount <= 1 || amount > 100) {
			return message.reply('You need to type a number between 1 and 99 to purge!');
		}
		message.delete();
		message.channel.bulkDelete(amount, true);
		message.channel.send(`Alright deleted ${args} messages`)
			.then(msg => {
				client.setTimeout(() => msg.delete(), 5000);
			}).catch(err => {
				console.error(err);
				message.channel.send('there was an error trying to prune messages in this channel!');
			});
	},
};