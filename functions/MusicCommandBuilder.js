const {SlashCommandBuilder} = require("@discordjs/builders");
const Player = require("../music/playlist.json");

module.exports.MusicSlashCommandBuilder = function (){
    let musicSlashCommandBuilder = new SlashCommandBuilder();
    musicSlashCommandBuilder.setName("play");
    musicSlashCommandBuilder.setDescription("Грає патріотичні мікси");

    for (let [theme, playlists] of Object.entries(Player)){
        musicSlashCommandBuilder.addSubcommand(function (subcommand){
            subcommand.setName(theme);
            subcommand.setDescription(theme);

            let arrayOfOptionsNames = [];
            for(let i = 0; i < playlists.length; i++){
                arrayOfOptionsNames[i] = playlists[i].playlistName;
            }
            let choices = [];
            for(let i = 0; i < arrayOfOptionsNames.length; i++){
                choices.push({
                    name: arrayOfOptionsNames[i],
                    value: arrayOfOptionsNames[i]
                });
            }
            subcommand.addStringOption(option => {
                option
                    .setName("назваплейлісту")
                    .setDescription("тільки");
                option.choices = choices;

                return option.setRequired(true);
            });
            return subcommand;
        });

    }
    return musicSlashCommandBuilder;
}