
//discord part
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const fs = require('node:fs');
const path = require('node:path')

const imagesPath = path.join(__dirname, 'rusimages');
const images = fs.readdirSync(imagesPath).filter(file => file.endsWith('.jpg'));



module.exports = {
	data: new SlashCommandBuilder()
		.setName('getdeadrussian')
		.setDescription('Скидує рандомний труп росіянина!')
        .addIntegerOption(option =>
            option.setName('id')
                .setDescription('Якщо хочете, то додайте конкретне айді')
                .setRequired(false)),
	async execute(interaction) {

        if(!interaction.channel.nsfw)
            return interaction.reply("ONLY IN NSFW CHANNELS");

        let randId = Math.floor(Math.random() * images.length); 
        let Id = interaction.options.getInteger('id');

        //validating id
        Id = (Id >= 0 && Id < images.length) ? Id : undefined;

        let actualId = Id ?? randId;
        let titleText = (actualId===Id) ? `Ви вибрали цього російського мертвяка:` : `Айді рандомного російського мертвяка є ${actualId}`;


        const embed = new Discord.MessageEmbed()
            .setColor('#990000')
            .setTitle(titleText)
            .setImage('attachment://' + images[actualId]);
        await interaction.reply({ 
            embeds: [embed],
            files: [imagesPath + '//' + images[actualId]] 
        });
        
	},
};




