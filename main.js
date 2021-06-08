const Discord = require('discord.js');
const client = new Discord.Client({
	intents: ['GUILDS', 'GUILD_BANS', 'GUILD_EMOJIS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'],
	partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
});
const { prefix, token } = require('./config.json');

client.on('ready', async () => {
	console.log(`${client.user.tag} is logged in!`);
});

client.on('message', async (message) => {
	const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();
	if (!message.content.toLowerCase().startsWith(prefix)) return;
	command;
});
client.login(token);
