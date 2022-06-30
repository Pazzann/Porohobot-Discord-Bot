const { MessageEmbed } = require('discord.js');
const { QueryType } = require("discord-player")
const {SlashCommandBuilder} = require("@discordjs/builders");



module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Показує список пісень які грають"),
    async execute(interaction, client){
        let answer = "";
        const queue = client.player.getQueue(interaction.guildId);
        if (!queue) return await interaction.reply("There is nothing playing now");
        for (let i = 0; i < queue.tracks.length; i++){
            answer += queue.tracks[i].title;
            answer += "\n";
        }

        await interaction.reply(answer);
    }
}