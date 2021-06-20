/* eslint-disable no-unused-vars */
module.exports = {
	name: 'guildUpdate',
	execute(oldGuild, newGuild, client) {
		const channela = newGuild.channels.cache.find(ch => !oldGuild.channles.cache.has(ch.id));
		const muterole = newGuild.roles.cache.find(r => r.name === 'Muted');
		const cc = channela.createOverwrite(muterole, {
			SEND_MESSAGES: false,
			CONNECT: false,
			ADD_REACTIONS: false,
		});
	},
};