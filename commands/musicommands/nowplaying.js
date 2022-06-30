const { MessageEmbed } = require('discord.js');
const { QueryType } = require("discord-player")
const {SlashCommandBuilder} = require("@discordjs/builders");



module.exports = {
    data: new SlashCommandBuilder()
        .setName("nowplaying")
        .setDescription("Показує пісню яка зараз грає"),
    async execute(interaction, client){
        const queue = client.player.getQueue(interaction.guildId);
        if (!queue) return await interaction.reply("There is nothing playing now");

        const current = queue.current;
        await interaction.reply(`Зараз грає: ${current.title} \n${current.author}`);
    }
}