// // discord command listener
//
// const DiscordJS = require('./node_modules/discord.js');
// const MsgCreate = require("./functions/MsgCreate.js")
// const {Player} = require('discord-player');
// const {RegCommands} = require('./functions/CommandRegister');
const {token, clientId, clientSecret} = require('./config.json');
// const {parse} = require('node-html-parser');
// const {MessageEmbed} = require('discord.js');
//
//
// const client = new DiscordJS.Client({
//     intents: [
//         DiscordJS.Intents.FLAGS.GUILDS,
//         DiscordJS.Intents.FLAGS.GUILD_MESSAGES,
//         DiscordJS.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
//         DiscordJS.Intents.FLAGS.GUILD_VOICE_STATES
//     ]
// });
// client.player = new Player(client, {
//     ytdlOptions: {
//         quality: "highestaudio",
//         highWaterMark: 1 << 25
//     }
// })
// const sources = ["commoncommands", "dickgamecommands", "musicommands", "newscommands"];
// const commands = new Map();
// for (let i = 0; i < sources.length; i++) {
//     for (let [key, value] in RegCommands(commands, sources[i]).entries()) {
//         commands.set(key, value);
//     }
// }
//
// //tells that bot is started
// client.on('ready', () => {
//     console.log("\x1b[31m", 'Порохобот has started!');
// });
//
//
// //func that replies to each msg of discord if includes ukrainian cheer
// client.on('messageCreate', MsgCreate.MsgReading);
//
// //replies to slash commands
// client.on("interactionCreate", async interaction => {
//
//     if (!interaction.isCommand()) return;
//
//     const command = commands.get(interaction.commandName);
//     if (!command) return interaction.reply("Try another command");
//
//     try {
//         await command.execute(interaction, client, feeder);
//     } catch (error) {
//         console.error(error);
//         await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
//     }
// });
//
// client.login(token);
//
//
// //rss listener
//
// const RssFeedEmitter = require('rss-feed-emitter');
const path = require("node:path");
const fs = require("node:fs");
// const feeder = new RssFeedEmitter();
//
//
// //load cache of feeder
//
// function regLinks() {
//     const pathRSS = path.join(__dirname);
//     const rssLinks = JSON.parse(fs.readFileSync(pathRSS + '/commands/newscommands/rss.json', 'utf8'));
//     for (let link of rssLinks) {
//         try {
//             feeder.add({
//                 url: link,
//                 refresh: 5000,
//             });
//         } catch (err) {
//             console.log(err);
//         }
//     }
//     console.log("\x1b[32m", 'feeder loaded links succesfully');
// }
//
// setTimeout(regLinks, 6000);
//
//
// feeder.on('addrss', (url, interaction, rssLinks, pathRSS) => {
//     try {
//         feeder.add({
//             url: url,
//             refresh: 5000,
//         });
//         fs.writeFileSync(pathRSS + '/rss.json', JSON.stringify(rssLinks, null, 2));
//         interaction.reply("ВДАЛОСЯ")
//     } catch (err) {
//         console.log(err);
//         interaction.reply("НЕВДАЛОСЯ")
//     }
// })
//
//
// feeder.on('new-item', function (item) {
//     try {
//         if ((Date.now() - item.pubdate) < 1800000) {
//             const embed = new MessageEmbed()
//                 .setColor("#" + Math.floor(Math.random() * 16777215).toString(16))
//                 .setTitle('📄 | ' + item.title
//                     .split('&#39;').join('\'')
//                     .split('&quot;').join('"')
//                     .split('&#33;').join('!')
//                     .split('&quot;').join('"')
//                     .split('&#036;').join('$')
//                 )
//                 .setURL(item.link)
//                 .setImage(item?.enclosures[0]?.url ?? null)
//                 .setFooter({text: String(item.pubdate.getHours() + ':' + item.pubdate.getMinutes()), iconURL: null})
//                 .setAuthor({name: item.meta['rss:title']['#'], iconURL: null, url: item.meta['rss:link']['#']});
//
//             const root = parse(item.description);
//             let a = '';
//             let divcont = root.getElementsByTagName('div')[0]?.innerHTML
//                 .split('<br>').join('\n')
//                 .split('/b').join('b')
//                 .split('<b>').join('**')
//                 .split('&#39;').join('\'')
//                 .split('&#33;').join('!')
//                 .split('&quot;').join('"')
//                 .split('&#036;').join('$')
//             if (divcont !== undefined) {
//                 divcont = parse(divcont);
//
//                 for (let node of divcont.childNodes) {
//                     a += node.innerHTML ?? node._rawText;
//                 }
//             }
//             embed.setDescription(a ?? null);
//
//             const pathRSSChannels = path.join(__dirname);
//             const rssChannels = Array.from(JSON.parse(fs.readFileSync(pathRSSChannels + '/commands/newscommands/newsguilds.json', 'utf8')));
//
//             let rssMapChannels = new Map();
//             for (let value of rssChannels) {
//                 rssMapChannels.set(value[0], value[1]);
//             }
//
//             let arr = rssMapChannels.get(item.meta.link);
//             for (let id of arr) {
//                 const channel = client.channels.cache.get(id[0]);
//                 if (id[1]) {
//                     channel.send({content: "@everyone", embeds: [embed]});
//                 } else {
//                     channel.send({embeds: [embed]});
//                 }
//
//             }
//         }
//     } catch (err) {
//         console.log(err);
//     }
//
// })
//
// feeder.on('error', console.error);
//


// dashboard carry

const express = require('express');
const app = express();
const sitePath = path.join(__dirname, "/porohobotSiteFront");
const jsonParser = express.json();

const fetch = require('node-fetch');
const { url } = require('inspector');
const { URLSearchParams } = require('url');




app.use(express.static(sitePath));

app.use('/index.html', function (request, response) {
    response.redirect('/');
});


app.post('/auth', jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('grant_type', 'authorization_code');
    params.append('code', request.body.code);
    params.append('redirect_uri', "http://localhost:3000/index.html");

    fetch('https://discord.com/api/oauth2/token', {
        method: 'post',
        body: params,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' },
    }).then(r => r.json()).then(Response => {
        fetch("https://discord.com/api/users/@me", {
            method: 'get',
            body: null,
            headers:{
                'Authorization': `Bearer ${Response.access_token}`
            }
        }).then(r => r.json()).then(UserResponse => {
            response.json(UserResponse); // отправляем пришедший ответ обратно
        });
    });
});

app.use('/', function (request, response) {
    response.sendFile(sitePath + "/index.html");
});




app.listen(3000);