const { MessageEmbed } = require('discord.js');
const {SlashCommandBuilder} = require("@discordjs/builders");



module.exports = {
    data: new SlashCommandBuilder()
        .setName("nowplaying")
        .setDescription("Показує пісню яка зараз грає"),
    async execute(interaction, client){
        const queue = client.player.getQueue(interaction.guildId);
        if (!queue) return await interaction.reply("There is nothing playing now");

        const current = queue.current;

        const embed = new MessageEmbed()
            .setTitle(`🎵 Зараз грає:`)
            .setDescription(`\`\`[${current.duration}]\`\` __${current.title}__\nby **${current.author}**`)
            .setURL(current.url)
            .setThumbnail(current.thumbnail)
            .setColor('#ff9595');

        await interaction.reply({embeds: [embed]});
    }
}