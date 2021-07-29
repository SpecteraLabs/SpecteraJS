module.exports = {
	name: 'interactionCreate',
	execute: async (interaction, client) => {
		if (!interaction.isCommand()) return;

		if (!client.commands.has(interaction.commandName)) return;
		try {
			await client.commands.get(interaction.commandName).execute(interaction);
		}
		catch (err) {
			console.error(err);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};