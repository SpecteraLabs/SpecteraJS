/* eslint-disable no-unused-vars */
const path = require('path');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
	intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MEMBERS', 'GUILD_PRESENCES', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_TYPING', 'GUILD_BANS', 'GUILD_WEBHOOKS'],
});

const config = require('./config.json');
const loadCommands = require('./load-commands');

client.on('ready', async () => {
	console.log('The client is ready!');

	const baseFile = 'command-base.js';
	const commandBase = require(`./commands/${baseFile}`);

	loadCommands(client);
	commandBase.loadPrefixes(client);
	const activities = [`${client.guilds.cache.size} servers`, '+help for list of commands', 'Join https://discord.gg/WaqYbeFQUb for support'];
	setInterval(function() {
		const randAact = activities[Math.floor(Math.random() * activities.length)];
		client.user.setActivity(randAact, { type: "WATCHING" });
	}, 2800);
});

client.login(config.token);