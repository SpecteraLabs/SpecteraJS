/* eslint-disable no-inner-declarations */
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
		let muterole = message.guild.roles.cache.find(r => r.name === 'Muted');
		if (!muterole) {
			message.reply('No muterole found for this server!');
			muterole = await message.guild.roles.create({
				name: 'Muted',
				color: '#696969',
				reason: 'This server needed a MuteRole',
			});
			function getChannelIDs(fetch) {
				const mutrole = message.guild.roles.cache.find(r => r.name === 'Muted');
				try{
					let channels = message.guild.channels.cache.array();
					for (const channel of channels) {
						channel.createOverwrite(mutrole, {
							SEND_MESSAGES: false,
							ADD_REACTIONS: false,
							CONNECT: false,
						});
					}
					mutedPerson.roles.add(muterole);
				}
				catch(err) {
					console.log('array error');
					message.channel.send('An error occoured while getting the channels.');
					console.log(err);
				}
			}
			getChannelIDs();
			message.channel.send(`Created a muterole for this server, now you can use that role to mute people`);
		}
		message.delete();
		mutedPerson.roles.add(muterole);
		message.channel.send(`Alright successfully muted ${mutedPerson.user.tag}`).then((msg) => {
			client.setTimeout(() => msg.delete(), 3000);
		});
	},
};