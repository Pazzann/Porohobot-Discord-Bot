const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

const fs = require('node:fs');
const path = require('node:path')


module.exports ={
    data: new SlashCommandBuilder()
        .setName('addrss')
        .setDescription('Додає слухач рсс до вашого серверу.')
        .setDefaultMemberPermissions(Permissions.FLAGS.ADMINISTRATOR)
        .addStringOption(option =>
            option.setName('rsslink')
                .setDescription('Лінк на рсс')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName("rsschannel")
                .setDescription('Канал у якому буде поститься')
                .setRequired(true)),
    async execute(interaction, client, feeder){

        const pathRSSChannels = path.join(__dirname);
        const rssChannels = Array.from(JSON.parse(fs.readFileSync(pathRSSChannels + '/newsguilds.json', 'utf8')));

        let rssMapChannels = new Map();
        for(let value of rssChannels){
            rssMapChannels.set(value[0], value[1]);
        }


        const pathRSS = path.join(__dirname);
        const rssLinks = Array.from( JSON.parse(fs.readFileSync(pathRSS + '/rss.json', 'utf8')) );

        const rssLink = interaction.options.getString('rsslink');
        const channel = interaction.options.getChannel('rsschannel');

        if(!rssLinks.includes(rssLink)){
            rssLinks.push(rssLink);
            feeder.emit('addrss', rssLink, interaction, rssLinks, pathRSS);
        }else {
            interaction.reply("ДОДАНО");
        }

        if(rssMapChannels.has(rssLink)){
            let arrChannels = rssMapChannels.get(rssLink)
            if(!arrChannels.includes(channel.id)){
                arrChannels.push(channel.id);
                rssMapChannels.set(rssLink, arrChannels);
            }
            fs.writeFileSync(pathRSSChannels + '/newsguilds.json', JSON.stringify(rssMapChannels, null, 2));
        }else{
            rssMapChannels.set(rssLink, [channel.id]);
        }
        let arr = [];
        for (let value of rssMapChannels.entries()){
            arr.push(value);
        }
        fs.writeFileSync(pathRSSChannels + '/newsguilds.json', JSON.stringify(arr, null, 2));


    }
}