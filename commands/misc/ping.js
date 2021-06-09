/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['ping', 'latency'],
	description: 'Shows the bot\'s latency',
	callback: (message, args, text, client) => {
		message.reply(`🏓Latency is **${Math.round(client.ws.ping)}** ms`);
	},
};