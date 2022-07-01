const { MessageEmbed } = require('discord.js');
const { QueryType } = require("discord-player")
const {SlashCommandBuilder} = require("@discordjs/builders");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Скіпнути трек"),
    async execute(interaction, client) {
        const queue = client.player.getQueue(interaction.guildId);

        if (!queue) return await interaction.reply("There is nothing playing now");

        const curr = queue.current;
        queue.skip();

        const embed = new MessageEmbed()
            .setColor('#a450a3')
            .setThumbnail(curr.thumbnail)
            .setTitle(`⏭ Трек скіпнуто!`)
            .setDescription(curr.title);

        interaction.reply({embeds: [embed]});

    }
}