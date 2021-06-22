/* eslint-disable no-unused-vars */
const db = require('quick.db');
module.exports = {
	name: 'guildMemberAdd',
	execute: async (member, client) => {
		const result = db.get(`autoRole_${member.guild.id}`);
		const role = member.guild.roles.cache.find(r => r.name === result);
		try {
			member.roles.add(role);
		}
		catch (err) {
			console.log(err);
		}
	},
};