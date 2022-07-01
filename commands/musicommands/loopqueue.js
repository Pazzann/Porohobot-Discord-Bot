const { MessageEmbed } = require('discord.js');
const {SlashCommandBuilder} = require("@discordjs/builders");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("loopqueue")
        .setDescription("Залуплює чергу пісень"),
    async execute(interaction, client) {
        const queue = client.player.getQueue(interaction.guildId);

        if (!queue) return await interaction.reply("There is nothing playing now");

        const embed = new MessageEmbed()
            .setColor('#d750ef')
            .setDescription(`**Це не жарт...**`);

        if (queue.repeatMode == 2) {
            queue.repeatMode = 0;
            embed.setTitle(`♾ Цикл з черги знято`);
        } else {
            queue.repeatMode = 2;
            embed.setTitle(`♾ Зациклено чергу`);
        }
        interaction.reply({embeds: [embed]});
    }
}