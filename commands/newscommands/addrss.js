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
        const rssMapChannels = new Map(JSON.parse(fs.readFileSync(pathRSSChannels + '/newsguilds.json', 'utf8')));

        const pathRSS = path.join(__dirname);
        const rssLinks = JSON.parse(fs.readFileSync(pathRSS + '/rss.json', 'utf8'));

        const rssLink = interaction.options.getString('rsslink');
        const channel = interaction.options.getChannel('rsschannel');

        if(!rssLinks.includes(rssLink)){
            rssLinks.push(rssLinks);
            fs.writeFileSync(pathRSS + '/rss.json', JSON.stringify(rssLinks, null, 2));
            feeder.emit('addrss', rssLink);
        }
        if(rssMapChannels.has(rssLink)){
            rssMapChannels.get(rssLink).push(channel.id);
            fs.writeFileSync(pathRSSChannels + '/newsguilds.json', JSON.stringify(rssMapChannels, null, 2));
        }else{
            rssMapChannels.set(rssLink, [channel.id]);
            fs.writeFileSync(pathRSSChannels + '/newsguilds.json', JSON.stringify(rssMapChannels, null, 2));
        }

        interaction.reply('succesfull');
    }
}