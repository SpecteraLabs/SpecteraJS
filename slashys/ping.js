module.exports = {
	name: 'ping',
	description: 'Replies with Bot\'s Latency',
	execute: async (interaction) => {
		await interaction.reply(`:ping_pong: Pong! Latency is **${Math.round(interaction.client.ws.ping)}** ms`);
	},
};