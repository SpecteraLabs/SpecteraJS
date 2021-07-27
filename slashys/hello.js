module.exports = {
	name: 'hello',
	description: 'Sends you an invisible hello',
	execute: async (interaction) => {
		await interaction.reply({ content: 'hola', ephemeral: true });
	},
};