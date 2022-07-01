const { MessageEmbed } = require('discord.js');
const { QueryType } = require("discord-player");
const {SlashCommandBuilder} = require("@discordjs/builders");


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("Перемішує чергу"),
    async execute(interaction, client) {
        const queue = client.player.getQueue(interaction.guildId);
        if (!queue) return await interaction.reply("There is nothing playing now");

        const embed = new MessageEmbed()
            .setTitle("🌀 Черга перемішана!")
            .setDescription(`**${queue.tracks.length}** треків перемішано.`)
            .setColor('#0dda2d');

        queue.tracks = shuffle(queue.tracks);
        interaction.reply({embeds: [embed]});
    }
}