const { MessageEmbed } = require('discord.js');
const { MusicSlashCommandBuilder }= require('../../functions/MusicCommandBuilder.js');
const { QueryType } = require("discord-player")
const Playlists = require('../../music/playlist.json');

function createEmbed(playlist){
    const musicEmbed = new MessageEmbed()
        .setColor('#d5b33e')
        .setTitle(playlist.playlistName)
        .setDescription(playlist.playlistDescription);
    return musicEmbed;
}


function getUrlFromArrayByName(arr, name){
    for (let i = 0; i < arr.length; i++){
        if (arr[i].playlistName == name){
            return arr[i];
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

        let actualPlaylist = Playlists[interaction.options.getSubcommand()];
        actualPlaylist = getUrlFromArrayByName(actualPlaylist, interaction.options.getString("назваплейлісту"))

        const result = await client.player.search(actualPlaylist.playlistUrl,{
            requestedBy: interaction.user,
            searchEngine: QueryType.YOUTUBE_PLAYLIST
        })
        if (result.tracks.length === 0)
            return interaction.reply("NO RESULTS");

        const playlist = result.playlist;
        await queue.addTracks(result.tracks);

        if (!queue.playing) await queue.play();
        const embed = createEmbed(actualPlaylist);
        await interaction.reply({embeds: [embed]});
    }
}
