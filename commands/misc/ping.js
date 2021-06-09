/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['ping', 'latency'],
	callback: (message, args, text, client) => {
		message.reply(`🏓Latency is **${Date.now() - message.createdTimestamp}**ms`);
	},
};