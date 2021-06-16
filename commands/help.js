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
	minArgs: 0,
	maxArgs: 2,
	cooldown: 20,
	callback: (message, args, text) => {
		if (!args.length) {
			const halpembed = new MessageEmbed()
				.setTitle('Help')
				.addFields(
					{ name: "Prefix", value: "`setprefix`" },
					{ name: "Misc", value: "\`ping\` \`latency\` \`runtime\`" },
					{ name : "Moderation", value: "\`warn\` \`clearwarn\` \`listwarns\` \`mute\` \`kick\` \`ban\`" },
				)
				.setColor('#FFFFFF')
				.setTimestamp();
			message.reply({ embeds : [halpembed] });
		}
		else if (args[0].toLowerCase() === 'ping' || args[0].toLowerCase() === 'latency' || args[0].toLowerCase() === 'runtime') {
			const Lembed = new MessageEmbed()
				.setTitle('Ping | Latency | Runtime')
				.setDescription(`\`\`\`yaml\n #Shows bot latency \n Usage: +ping or +latency or +runtime\`\`\``)
				.setColor('#FFFFFF')
				.setTimestamp();
			message.reply({ embeds: [Lembed], allowedMentions: { repliedUser: false } });
		}
		else if (args[0].toLowerCase() === 'warn') {
			const wEmbed = new MessageEmbed()
				.setTitle('Warn')
				.setColor('#FFFFFF')
				.setTimestamp()
				.setDescription('\`\`\`yaml\n #Warns a user \n Usage: +warn <target(Must Mention)> <reason>\`\`\`');
			message.reply({ embeds: [wEmbed], allowedMentions: { repliedUser: false } });
		}
		else if (args[0].toLowerCase() === 'lw' || args[0].toLowerCase() === 'listwarnings' || args[0].toLowerCase() === 'listwarns') {
			const waEmbed = new MessageEmbed()
				.setTitle('ListWarnings || Listwarns || Lw')
				.setDescription('\`\`\`yaml\n #Lists warnings of a user \n Usage : +listwarns <target(Must Mention)> \`\`\`')
				.setColor('#FFFFFF')
				.setTimestamp();
			message.reply({ embeds: [waEmbed], allowedMentions: { repliedUser: false } });
		}
		else if (args[0].toLowerCase() === 'cw' || args[0].toLowerCase() === 'clearwarn' || args[0].toLowerCase() === 'cwarn') {
			const cembed = new MessageEmbed()
				.setTitle('Clearwarn | Cwarn |Cw')
				.setDescription('\`\`\`yaml\n #Clears all warnings of a user \n Usage : +clearwarn <target(Must Mention)>\`\`\`')
				.setColor('#FFFFFF')
				.setTimestamp();
			message.reply({ embeds: [cembed], allowedMentions: { repliedUser: false } });
		}
	},
};