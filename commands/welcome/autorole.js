/* eslint-disable no-unused-vars */
const mongo = require("../../mongo");
const AutoRoleSchema = require("../../schemas/auto-role-schema");
module.exports = {
	commands: ["autorole", "ar"],
	permissions: "ADMINISTRATOR",
	permissionError:
	'You do not have "ADMINISTRATOR" permission to run this command!',
	callback: async (message, args, text, client) => {
		if (!args.length) return message.reply(`Usage , +autorole <role>`);
		const arole =
		message.guild.roles.cache.get(args[0]) ||
		message.mentions.roles.first() ||
		message.guild.roles.cache.find((r) => r.name === args[0]);
		if (!arole) {
			message.reply("Invalid role!");
		}
		const guildId = message.guild.id;
		const roleId = arole.id;
		await mongo().then(async (mongoose) => {
			await AutoRoleSchema.findOneAndUpdate(
				{
					_id: guildId,
				},
				{
					_id: guildId,
					roleId,
				},
				{
					upsert: true,
				},
			);
			message.reply(`Server AutoRole is now ${args[0]}`);
		});
	},
};