module.exports = {
	name: 'ready',
	execute(client) {
		const baseFile = 'command-base.js';
		const commandBase = require(`../commands/${baseFile}`);
		const loadCommands = require(`../load-commands`);

		loadCommands(client);
		commandBase.loadPrefixes(client);
		const activities = [`${client.guilds.cache.size} servers`, '+help for list of commands', 'Join https://discord.gg/WaqYbeFQUb for support'];
		setInterval(function() {
			const randAact = activities[Math.floor(Math.random() * activities.length)];
			client.user.setActivity(randAact, { type: "WATCHING" });
		}, 2800);
		console.log(`${client.user.tag} is ready on ${client.guilds.cache.size} servers and ${client.users.cache.size} members using it`);
	},
};