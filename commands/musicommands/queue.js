const {MessageEmbed} = require('discord.js');
const {SlashCommandBuilder} = require("@discordjs/builders");

function CreateEmbed(queue) {
    let answer = "";
    if(queue.tracks.length == 0) answer = "Тут пусто....";
    else{
        let length = (queue.tracks.length > 10) ? 10 : queue.tracks.length;
        for (let i = 0; i < length; i++) {
            answer += `\`\`${i + 1}.\`\`__*${queue.tracks[i].title}*__ **[${queue.tracks[i].duration}]**\n`;
        }
    }
    let current = queue.current;



    let embed = new MessageEmbed()
        .setTitle("🔊 Вся черга:")
        .setColor('#0747dc')
        .setThumbnail(current.thumbnail)
        .addFields(
            {name: '💿 Зараз грає:', value: `[${current.duration}]${current.title}`},
            {name: '\u200B', value: '\u200B'},
            {name: '🎶 У черзі:', value: answer},
        );

    return embed
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Показує список пісень які грають"),
    async execute(interaction, client) {

        const queue = client.player.getQueue(interaction.guildId);
        if (!queue) return await interaction.reply("There is nothing playing now");

        const embed = CreateEmbed(queue);

        await interaction.reply({embeds: [embed]});
    }
}