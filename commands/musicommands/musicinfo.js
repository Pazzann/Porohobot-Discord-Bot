const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('musicinfo')
        .setDescription('Допомога зі списком плейлістів'),
    async execute(interaction) {
        const filePath = path.join(__dirname);
        const playlists = JSON.parse(fs.readFileSync(filePath + "\\../../music/playlist.json", "utf8"))

        let j = 0;
        let playlistDesc = [];
        for (let [key, values] of Object.entries(playlists)) {
            for (let value of values) {
                playlistDesc[j] = {
                    name: `🎵 ${value?.playlistName}`,
                    value: `🎶 **Опис:** ${value?.playlistDescription}\n💿 **Жанр:** ${key}`
                }
                j++;
            }
        }

        const embed = new MessageEmbed()
            .setTitle("📣 Список музики:")
            .setColor('#adffb9')
            .addFields(...playlistDesc)

        interaction.reply({embeds: [embed]});
    }
}