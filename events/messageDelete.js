module.exports = {
	name: 'messageDelete',
	execute: async (message, client) => {
		client.snipes.set(message.channel.id, {
			content: message.content,
			author: message.author.tag,
			member: message.member,
			image: message.attachments.first() ? message.attachments.first().proxyURL : null,
		});
	},
};