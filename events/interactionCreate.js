module.exports = {
	name: 'interactionCreate',
	execute: async (interaction, client) => {
		if (interaction.isCommand()) {
			if (interaction.commandName === 'ping') {
				await interaction.reply(`:ping_pong: Pong! Latency is : **${client.ws.ping}**ms`);
			}
		}
	},
};