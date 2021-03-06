const {MessageEmbed} = require('discord.js');
const {QueryType} = require("discord-player")
const {SlashCommandBuilder} = require("@discordjs/builders");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("quit")
        .setDescription("Бот виходить з войсу та очищує чергу"),
    async execute(interaction, client) {
        const queue = client.player.getQueue(interaction.guildId);

        if (!queue) return await interaction.reply("There is nothing playing now");

        queue.destroy();
        const embed = new MessageEmbed()
            .setColor('#ffa094')
            .setTitle(`☎️⠀Допобачення!`)
            .setDescription('Користуйтесь ще! Не вимагайте Порошенко чекати!');

        interaction.reply({embeds: [embed]});
    }
}