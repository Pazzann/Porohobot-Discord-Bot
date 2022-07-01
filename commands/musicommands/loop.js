const { MessageEmbed } = require('discord.js');
const { QueryType } = require("discord-player")
const {SlashCommandBuilder} = require("@discordjs/builders");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("loop")
        .setDescription("залуплює окрему пісню"),
    async execute(interaction, client) {
        const queue = client.player.getQueue(interaction.guildId);

        if (!queue) return await interaction.reply("There is nothing playing now");

        if( queue.repeatMode == 1 ){
            queue.repeatMode = 0;
            interaction.reply("Unlooped track");
        }else{
            queue.repeatMode = 1;
            interaction.reply("Looped track");
        }
    }
}