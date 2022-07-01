const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('musicinfo')
        .setDescription('Допомога зі списком плейлістів'),
    async execute(interaction){

        interaction.reply("IN DEVELOPEMENT");
    }
}