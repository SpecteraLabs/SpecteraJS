/* eslint-disable no-unused-vars */
const commandBase = require('../command-base');

const { MessageEmbed } = require('discord.js');

module.exports = {
    commands: 'misc',
    description: 'Embed Color Schema that should be used for Misc category',
    callback: async (message) => {
        let miscEmbed = new MessageEmbed()
            .setColor('#03b1fc')
            .setAuthor('Misc') // This is optional but really looks good when the category is small
            .setTimestamp();

        message.reply({ embed: miscEmbed })
    }
};