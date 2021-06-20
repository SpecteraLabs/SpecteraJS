module.exports = {
	name: 'guildCreate',
	execute: async (guild, client) => {
		guild.me.setNickname('[+] Obligator');
		const activities = [`${client.guilds.cache.size} servers`, '+help for list of commands', 'Join https://discord.gg/WaqYbeFQUb for support'];
		setInterval(function() {
			const randAact = activities[Math.floor(Math.random() * activities.length)];
			client.user.setActivity(randAact, { type: "WATCHING" });
		}, 2800);
	},
};