/* eslint-disable no-unused-vars */
const db = require('quick.db');
module.exports = {
	name: 'guildMemberAdd',
	execute: async (member, client) => {
		db.fetch(`autoRole_${member.guild.id}`).then((i) => {
			try {
				member.roles.add(i.text);
			}
			catch (e) {
				console.log(e);
			}
		});
	},
};