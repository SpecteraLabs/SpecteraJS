/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['deploy'],
	callback: async (message, args, text, client) => {
		if (!message.author.id === '564468550727761920') return;
		const data = {
			name: 'ping',
			description: 'Replies with the bot\'s latency',
		};
		const command = await client.guilds.cache.get('799508367478620222').commands.create(data);
	},
};