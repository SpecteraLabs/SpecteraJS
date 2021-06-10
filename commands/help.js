/* eslint-disable no-useless-escape */
/* eslint-disable no-shadow-restricted-names */
/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
const loadCommands = require('../load-commands');
const { MessageEmbed } = require('discord.js');
const commandPrefixSchema = require('../schemas/command-prefix-schema');

module.exports = {
	commands: ['help', 'h'],
	description: "Describes all of this bot's commands",
	callback: (message, args, text) => {
		if (!args.length) {
			const halpembed = new MessageEmbed()
				.setTitle('Help')
				.addFields(
					{ name: "Prefix", value: "`setprefix`" },
					{ name: "Misc", value: "\`ping\` \`latency\ ` \`runtime\`" } 
				)
				/* I would recommend adding fields by the method above
				.addField('Prefix', '\`setprefix\`')
				.addField('Misc', '\`ping\` \`latency\` \`runtime\`')
				*/
				
				.setColor('#FFFFFF')
				.setTimestamp();
			message.reply({ embed : halpembed });
		}
		/*
		I wouldn't recommend adding this to every command like you did after the comment
		See my friend's help command repository if you understand it :/
		https://github.com/KineticTactic/KineticBot/blob/master/commands/utility/help.js
		*/
		else if (args[0].toLowerCase() === 'ping' || args[0].toLowerCase() === 'latency' || args[0].toLowerCase() === 'runtime') {
			const Lembed = new MessageEmbed()
				.setTitle('Ping | Latency | Runtime')
				.setDescription(`\`\`\`yaml\n #Shows bot latency \n Usage: +ping\`\`\``)
				.setTimestamp();
			message.reply({ embed: Lembed, allowedMentions: { repliedUser: false } });
		}
	},
};