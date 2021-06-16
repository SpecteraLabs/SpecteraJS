/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['mute'],
	permissions: 'MANAGE_ROLES',
	permissionError: 'You cannot mute people!',
	minArgs: 1,
	callback: async (message, args, text, client) => {
		const mutedPerson = message.mentions.members.first();
		if (!mutedPerson) {
			message.reply('You have to tag someone to mute!');
		}
		const muterole = message.guild.roles.cache.find(r => r.name === 'Muted');
		if (!muterole) {
			message.reply('No muterole found for this server!');
			await message.guild.roles.create({
				name: 'Muted',
				color: '#696969',
				reason: 'This server needed a MuteRole',
			});
			message.channel.send(`Created a muterole for this server, now you can use that role to mute people`);
		}
		message.delete();
		mutedPerson.roles.add(muterole);
		message.channel.send(`Alright successfully muted ${mutedPerson.tag}`).then((msg) => {
			client.setTimeout(() => msg.delete(), 3000);
		});
	},
};