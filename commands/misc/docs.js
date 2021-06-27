/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['docs', 'rtfm'],
	callback: async (message, args, text, client) => {
		if (!args.length) return message.reply(`Incorrect syntax, Use +docs <query>`);
		const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(args)}`;
		const axios = require('axios');
		axios.get(uri).then((embed) => {
			const { data } = embed;
			if (data && !data.error) {
				message.reply({ embeds : [data], allowedMentions: { repliedUser: false } });
			}
			else {
				message.reply('No result found in documentation!');
			}
		});
	},
};