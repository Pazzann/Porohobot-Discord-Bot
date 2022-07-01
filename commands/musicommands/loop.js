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

        const current = queue.current;
        const embed = new MessageEmbed()
            .setColor('#cb0000')
            .setDescription(`\`\`[${current.duration}]\`\` ${current.title}`)
            .setThumbnail(current.url);

        if( queue.repeatMode == 1 ){
            queue.repeatMode = 0;
            embed.setTitle(`♾ Цикл з треку знято`);
        }else{
            queue.repeatMode = 1;
            embed.setTitle(`♾ Зациклено трек`);
        }
        interaction.reply({embeds: [embed]});
    }
}