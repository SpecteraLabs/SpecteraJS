/* eslint-disable no-shadow */
const mongo = require('../mongo');
const commandPrefixSchema = require('../schemas/command-prefix-schema');
const { prefix: globalPrefix } = require('../config.json');
const guildPrefixes = {};

const validatePermissions = (permissions) => {
	const validPermissions = [
		'CREATE_INSTANT_INVITE',
		'KICK_MEMBERS',
		'BAN_MEMBERS',
		'ADMINISTRATOR',
		'MANAGE_CHANNELS',
		'MANAGE_GUILD',
		'ADD_REACTIONS',
		'VIEW_AUDIT_LOG',
		'PRIORITY_SPEAKER',
		'STREAM',
		'VIEW_CHANNEL',
		'SEND_MESSAGES',
		'SEND_TTS_MESSAGES',
		'MANAGE_MESSAGES',
		'EMBED_LINKS',
		'ATTACH_FILES',
		'READ_MESSAGE_HISTORY',
		'MENTION_EVERYONE',
		'USE_EXTERNAL_EMOJIS',
		'VIEW_GUILD_INSIGHTS',
		'CONNECT',
		'SPEAK',
		'MUTE_MEMBERS',
		'DEAFEN_MEMBERS',
		'MOVE_MEMBERS',
		'USE_VAD',
		'CHANGE_NICKNAME',
		'MANAGE_NICKNAMES',
		'MANAGE_ROLES',
		'MANAGE_WEBHOOKS',
		'MANAGE_EMOJIS',
	];

	for (const permission of permissions) {
		if (!validPermissions.includes(permission)) {
			throw new Error(`Unknown permission node "${permission}"`);
		}
	}
};

let recentlyRan = [];

module.exports = (client, commandOptions) => {
	let {
		commands,
		expectedArgs = '',
		permissionError = 'You do not have permission to run this command.',
		minArgs = 0,
		cooldown = -1,
		maxArgs = null,
		permissions = [],
		requiredRoles = [],
		callback,
	} = commandOptions;

	if (typeof commands === 'string') {
		commands = [commands];
	}

	console.log(`Registering command "${commands[0]}"`);

	if (permissions.length) {
		if (typeof permissions === 'string') {
			permissions = [permissions];
		}

		validatePermissions(permissions);
	}
	client.on('message', async (message) => {
		const { member, content, guild } = message;

		const prefix = guildPrefixes[guild.id] || globalPrefix;

		for (const alias of commands) {
			const command = `${prefix}${alias.toLowerCase()}`;

			if (
				content.toLowerCase().startsWith(`${command} `) ||
        content.toLowerCase() === command
			) {
				for (const permission of permissions) {
					if (!member.permissions.has(permission)) {
						message.reply(permissionError);
						return;
					}
				}

				for (const requiredRole of requiredRoles) {
					const role = guild.roles.cache.find(
						(role) => role.name === requiredRole,
					);

					if (!role || !member.roles.cache.has(role.id)) {
						message.reply(
							`You must have the "${requiredRole}" role to use this command.`,
						);
						return;
					}
				}
				let cooldownString = `${guild.id}-${member.id}-${commands[0]}`;
				if (cooldown > 0 && recentlyRan.includes(cooldownString)) {
					const currentTime = Date.now();
					const cda = cooldown * 1000;
					const exp = currentTime + cda;
					const rntime = (exp - currentTime) / 1000;
					message.reply(`Pls wait ${rntime.toFixed()}s till you use the command again`);
					return;
				}


				const args = content.split(/[ ]+/);
				args.shift();
				if (
					args.length < minArgs ||
          (maxArgs !== null && args.length > maxArgs)
				) {
					message.reply(
						`Incorrect syntax! Use ${prefix}${alias} ${expectedArgs}`,
					);
					return;
				}
				if (cooldown > 0) {
					recentlyRan.push(cooldownString);
					setTimeout(() => {
						recentlyRan = recentlyRan.filter((string) => {
							return string != cooldownString;
						});
					}, 1000 * cooldown);
				}

				// Handle the custom command code
				callback(message, args, args.join(' '), client);

				return;
			}
		}
	});
};


module.exports.updateCache = (guildId, newPrefix) => {
	guildPrefixes[guildId] = newPrefix;
};

module.exports.loadPrefixes = async (client) => {
	await mongo().then(async (mongoose) => {
		try {
			for (const guild of client.guilds.cache) {
				const guildId = guild[1].id;

				const result = await commandPrefixSchema.findOne({ _id: guildId });
				guildPrefixes[guildId] = result ? result.prefix : globalPrefix;
				module.exports = { varToExport: result };
			}

			console.log(guildPrefixes);
		}
		finally {
			mongoose.connection.close();
		}
	});
};
