/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['a'],
	callback: async (message, args, text, client) => {
		const db = require('quick.db');
		const result = db.get(`autoRole_${message.guild.id}`);
		console.log(result);
	},
};