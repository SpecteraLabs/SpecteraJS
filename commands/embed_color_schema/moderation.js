/* eslint-disable no-unused-vars */
const commandBase = require('../command-base');

const { MessageEmbed } = require('discord.js');

module.exports = {
    commands: 'mod',
    description: 'Embed Color Schema that should be used for Moderation category',
    callback: async (message) => {
        let miscEmbed = new MessageEmbed()
            .setColor('#fc030b')
            .setTimestamp();

        message.reply({ embed: miscEmbed })
    }
};