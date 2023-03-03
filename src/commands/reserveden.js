const { SlashCommandBuilder } = require('discord.js');
const dbhelper = require('../helpers/database.js');
const { execute } = require('./e621.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('create-den')
    .setDescription('Create a new "den" for one of your OCs')
    .addStringOption(option => option.setName('OC Name').setDescription('the name of the OC that will own this den').setRequired(true)),
    async execute(interaction) {
        const char = interaction.options.getString('OC Name')

        const reply = await interaction.reply({ content: `creating den for \`${char}\`...`, fetchReply: true })
        await interaction.editReply(`Created Den for \`${char}\`.\nPlease note the due to discord limitations all den can be accessed by anyone the can see the channel`)
    }
}