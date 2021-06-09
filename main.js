/* eslint-disable no-unused-vars */
const path = require('path');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
	intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MEMBERS', 'GUILD_PRESENCES', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_TYPING', 'GUILD_BANS', 'GUILD_WEBHOOKS'],
});

const config = require('./config.json');

client.on('ready', async () => {
	console.log('The client is ready!');

	const baseFile = 'command-base.js';
	const commandBase = require(`./commands/${baseFile}`);

	const readCommands = (dir) => {
		const files = fs.readdirSync(path.join(__dirname, dir));
		for (const file of files) {
			const stat = fs.lstatSync(path.join(__dirname, dir, file));
			if (stat.isDirectory()) {
				readCommands(path.join(dir, file));
			}
			else if (file !== baseFile) {
				const option = require(path.join(__dirname, dir, file));
				commandBase(client, option);
			}
		}
	};

	readCommands('commands');
	commandBase.loadPrefixes(client);
	client.user.setActivity(`${client.guilds.cache.size} servers | +help`, { type: "COMPETING" });
});

client.login(config.token);