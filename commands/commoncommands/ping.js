const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


const pingEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('PONG')
	.setDescription('HIHIHIHA');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Поиграйте в пингпонг!'),
	async execute(interaction) {
        await interaction.reply({ embeds: [pingEmbed] });
	},
};
