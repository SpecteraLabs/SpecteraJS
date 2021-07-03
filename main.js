/* eslint-disable no-unused-vars */
const path = require('path');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
	intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_PRESENCES', 'DIRECT_MESSAGES', 'GUILD_BANS', 'GUILD_WEBHOOKS'],
}).setMaxListeners(0);

const config = require('./config.json');
client.config = require('./configurations/config');
client.emotes = client.config.emotes;
client.colors = client.config.colors;
client.snipes = new Discord.Collection();

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

client.login(config.token);