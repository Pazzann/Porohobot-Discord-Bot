const {SlashCommandBuilder} = require('@discordjs/builders');
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const {clientId, token} = require('./config.json');
const Player = require('./music/playlist.json');
const {MusicSlashCommandBuilder} = require('./functions/MusicCommandBuilder.js');
const { Permissions } = require('discord.js');


const commands = [
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Поиграйте в пингпонг!'),
    new SlashCommandBuilder()
        .setName('getdeadrussian')
        .setDescription('Скидує рандомний труп росіянина!')
        .addIntegerOption(option =>
            option.setName('id')
                .setDescription('Якщо хочете, то додайте конкретне айді')
                .setRequired(false)),
    new SlashCommandBuilder()
        .setName('dick')
        .setDescription('Гра в кого найбільший ....'),
    new SlashCommandBuilder()
        .setName('dickleaderboard')
        .setDescription('Побачити лідербоард світу по грі у найбільшу піпіську'),
    new SlashCommandBuilder()
        .setName('mydick')
        .setDescription('Показуе ваш ....'),
    new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Показуе ваш профіль.'),
    new SlashCommandBuilder()
        .setName('help')
        .setDescription('Команда, яка знайомить вас с ботом.'),
    MusicSlashCommandBuilder(),
    new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Скіпнути трек"),
    new SlashCommandBuilder()
        .setName("quit")
        .setDescription("Бот виходить з войсу та очищує чергу"),
    new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Показує список пісень які грають"),
    new SlashCommandBuilder()
        .setName("nowplaying")
        .setDescription("Показує пісню яка зараз грає"),
    new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("Перемішує чергу"),
    new SlashCommandBuilder()
        .setName("loop")
        .setDescription("залуплює окрему пісню"),
    new SlashCommandBuilder()
        .setName("loopqueue")
        .setDescription("Залуплює чергу пісень"),
    new SlashCommandBuilder()
        .setName('musicinfo')
        .setDescription('Допомога зі списком плейлістів'),
    new SlashCommandBuilder()
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
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName("everyone")
                .setDescription('Чи відправляти з евріван?')
                .setRequired(true)),

]
    .map(command => command.toJSON());

const rest = new REST({version: '9'}).setToken(token);

rest.put(Routes.applicationCommands(clientId), {body: commands})
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
