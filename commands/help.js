/* eslint-disable no-useless-escape */
/* eslint-disable no-shadow-restricted-names */
/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
const { MessageEmbed } = require("discord.js");

module.exports = {
	commands: ["help", "h"],
	description: "Describes all of this bot's commands",
	minArgs: 0,
	maxArgs: 2,
	callback: (message, args, text) => {
		if (!args.length) {
			const halpembed = new MessageEmbed()
				.setTitle("Help")
				.addFields(
					{ name: "Prefix", value: "`setprefix`" },
					{ name: "Misc", value: "`ping` `docs` `v13docs`" },
					{
						name: "Moderation",
						value: "`warn` `clearwarn` `listwarns` `mute` `kick` `ban`",
					},
				)
				.setColor("#FFFFFF")
				.setTimestamp();
			message.reply({ embeds: [halpembed] });
		}
		else if (
			args[0].toLowerCase() === "ping" ||
			args[0].toLowerCase() === "latency" ||
			args[0].toLowerCase() === "runtime"
		) {
			const Lembed = new MessageEmbed()
				.setTitle("Ping | Latency | Runtime")
				.setDescription(
					`\`\`\`yaml\n#Shows bot latency \nUsage: +ping or +latency or +runtime\`\`\``,
				)
				.setColor("#FFFFFF")
				.setTimestamp();
			message.reply({
				embeds: [Lembed],
				allowedMentions: { repliedUser: false },
			});
		}
		else if (args[0].toLowerCase() === "warn") {
			const wEmbed = new MessageEmbed()
				.setTitle("Warn")
				.setColor("#FFFFFF")
				.setTimestamp()
				.setDescription(
					"```yaml\n#Warns a user \nUsage: +warn <target(Must Mention)> <reason>```",
				);
			message.reply({
				embeds: [wEmbed],
				allowedMentions: { repliedUser: false },
			});
		}
		else if (
			args[0].toLowerCase() === "lw" ||
			args[0].toLowerCase() === "listwarnings" ||
			args[0].toLowerCase() === "listwarns"
		) {
			const waEmbed = new MessageEmbed()
				.setTitle("ListWarnings || Listwarns || Lw")
				.setDescription(
					"```yaml\n#Lists warnings of a user \nUsage : +listwarns <target(Must Mention)> ```",
				)
				.setColor("#FFFFFF")
				.setTimestamp();
			message.reply({
				embeds: [waEmbed],
				allowedMentions: { repliedUser: false },
			});
		}
		else if (
			args[0].toLowerCase() === "cw" ||
			args[0].toLowerCase() === "clearwarn" ||
			args[0].toLowerCase() === "cwarn"
		) {
			const cembed = new MessageEmbed()
				.setTitle("Clearwarn | Cwarn |Cw")
				.setDescription(
					"```yaml\n#Clears all warnings of a user \nUsage : +clearwarn <target(Must Mention)>```",
				)
				.setColor("#FFFFFF")
				.setTimestamp();
			message.reply({
				embeds: [cembed],
				allowedMentions: { repliedUser: false },
			});
		}
		else if (args[0].toLowerCase() === "setprefix") {
			const spEmbed = new MessageEmbed()
				.setTitle("setprefix")
				.setDescription(
					"```yaml\n#Sets a prefix for this server \nUsage: +setprefix <prefix>```",
				)
				.setColor("#FFFFFF")
				.setTimestamp();
			message.reply({
				embeds: [spEmbed],
				allowedMentions: { repliedUser: false },
			});
		}
		else if (
			args[0].toLowerCase() === "removeprefix" ||
			args[0].toLowerCase() === "rprefix"
		) {
			const spEmbed = new MessageEmbed()
				.setTitle("Removeprefix | Rprefix")
				.setDescription(
					"```yaml\n#Removes the custom prefix for this server \nUsage: +rprefix```",
				)
				.setColor("#FFFFFF")
				.setTimestamp();
			message.reply({
				embeds: [spEmbed],
				allowedMentions: { repliedUser: false },
			});
		}
		else if (
			args[0].toLowerCase() === "rtfm" ||
			args[0].toLowerCase() === "docs"
		) {
			const docsEmbed = new MessageEmbed()
				.setTitle("Rtfm | Docs")
				.setColor("#FFFFFF")
				.setDescription(
					"```yaml\n#Searches something from discord.js stable version documentation and sends it \nUsage: +docs <query>```",
				)
				.setTimestamp();
			message.reply({
				embeds: [docsEmbed],
				allowedMentions: { repliedUser: false },
			});
		}
		else if (
			args[0].toLowerCase() === "v13rtfm" ||
			args[0].toLowerCase() === "v13docs"
		) {
			const docsEmbed = new MessageEmbed()
				.setTitle("Rtfm | Docs")
				.setColor("#FFFFFF")
				.setDescription(
					"```yaml\n#Searches something from discord.js master version documentation and sends it \nUsage: +v13docs <query>```",
				)
				.setTimestamp();
			message.reply({
				embeds: [docsEmbed],
				allowedMentions: { repliedUser: false },
			});
		}
	},
};
