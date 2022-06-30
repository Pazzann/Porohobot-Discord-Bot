const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { MusicSlashCommandBuilder }= require('./methods/MusicCommandBuilder.js');
const { QueryType } = require("discord-player")
const Playlists = require('./music/playlist.json');

function createEmbed(url){
    const musicEmbed = new MessageEmbed()
        .setColor('#d5b33e')
        .setTitle('TEST')
        .setDescription(url);
    return musicEmbed
}


function getUrlFromArrayByName(arr, name){
    for (let i = 0; i < arr.length; i++){
        if (arr[i].playlistName == name){
            return arr[i].playlistUrl;
        }
    }
    return "NO MATCHES";
}

module.exports = {
    data: MusicSlashCommandBuilder(),
    async execute(interaction, client){
        if(!interaction.member.voice.channel)
            return interaction.reply("YOU MUST BE IN VOICE CHANNEL");

        const queue = await client.player.createQueue(interaction.guild);
        if(!queue.connection) await queue.connect(interaction.member.voice.channel);

        let actualURL = Playlists[interaction.options.getSubcommand()];
        actualURL = getUrlFromArrayByName(actualURL, interaction.options.getString("назваплейлісту"))

        const result = await client.player.search(actualURL,{
            requestedBy: interaction.user,
            searchEngine: QueryType.YOUTUBE_PLAYLIST
        })
        if (result.tracks.length === 0)
            return interaction.reply("NO RESULTS");

        const playlist = result.playlist;
        await queue.addTracks(result.tracks);

        if (!queue.playing) await queue.play();
        const embed = createEmbed(actualURL);
        await interaction.reply({embeds: [embed]});
    }
}
