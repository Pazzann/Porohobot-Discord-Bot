
// discord command listener

const DiscordJS = require('./node_modules/discord.js');
const MsgCreate = require("./functions/MsgCreate.js")
const {Player} = require('discord-player');
const {RegCommands} = require('./functions/CommandRegister');
const {token} = require('./config.json');
const { parse } = require( 'node-html-parser' );
const { MessageEmbed } = require('discord.js');



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
for (let [key, value] in RegCommands(commands, "newscommands").entries()) {
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
        await command.execute(interaction, client, feeder);
    } catch (error) {
        console.error(error);
        await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    }
});

client.login(token);



//rss listener

const RssFeedEmitter = require('rss-feed-emitter');
const path = require("node:path");
const fs = require("node:fs");
const feeder = new RssFeedEmitter();


//load cache of feeder
const pathRSS = path.join(__dirname);
const rssLinks = JSON.parse(fs.readFileSync(pathRSS + '/commands/newscommands/rss.json', 'utf8'));
for (let link of rssLinks){
    try {
        feeder.add({
            url: link,
            refresh: 5000,
        });
    }catch (err){
        console.log(err);
    }

}
console.log('feeder loaded links succesfully')
setTimeout(()=>{test()}, 6000);
function test(){
feeder.add({
    url: 'http://152.67.92.49/?action=display&bridge=Telegram&username=novinach&format=Mrss',
    refresh: 5000,

});}

feeder.on('addrss', (url) => {
    feeder.add({
        url: url,
        refresh: 5000,
    });
})

feeder.on('new-item', function(item) {

    const embed = new MessageEmbed()
        .setColor('#c2de67')
        .setTitle('Test');

    const root = parse(item.description);
    try{
        const channel = client.channels.cache.get('993456883572674599');

        embed.setDescription( root.getElementsByTagName('div')[0].innerHTML );
        channel.send({embeds: [embed]});
    }catch (err){
        console.log(err);
    }

})

feeder.on('error', console.error);


