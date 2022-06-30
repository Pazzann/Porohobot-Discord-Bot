const DiscordJS = require('./node_modules/discord.js');
const dotenv = require('./node_modules/dotenv');
const fs = require('node:fs');
const path = require('node:path');
const MsgCreate = require("./functions/MsgCreate.js")
const {Player} = require('discord-player');
const {RegCommands} = require('./functions/CommandRegister')

const {token} = require('./config.json');

dotenv.config();

const client = new DiscordJS.Client({
    intents: [
        DiscordJS.Intents.FLAGS.GUILDS,
        DiscordJS.Intents.FLAGS.GUILD_MESSAGES,
        DiscordJS.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        DiscordJS.Intents.FLAGS.GUILD_VOICE_STATES
    ]
});
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

const commands = new Map();
for (let [key, value] in RegCommands(commands, "commoncommands").entries()) {
    commands.set(key, value);
}
for (let [key, value] in RegCommands(commands, "dickgamecommands").entries()) {
    commands.set(key, value);
}
for (let [key, value] in RegCommands(commands, "musicommands").entries()) {
    commands.set(key, value);
}


//tells that bot is started
client.on('ready', () => {
    console.log("\x1b[31m", 'Порохобот has started!');
});


//func that replies to each msg of discord if includes ukrainian cheer
client.on('messageCreate', (message) => MsgCreate.MsgReading(message));

//replies to slash commands
client.on("interactionCreate", async interaction => {

    if (!interaction.isCommand()) return;

    const command = commands.get(interaction.commandName);
    if (!command) return interaction.reply("Try another command");

    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error(error);
        await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    }
});

client.login(token);