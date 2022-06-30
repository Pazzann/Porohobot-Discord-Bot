const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Команда, яка знайомить вас с ботом.'),
    async execute(interaction) {
        interaction.reply("IN DEVELOPEMENT")
    }
}

