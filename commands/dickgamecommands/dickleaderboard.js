const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const fs = require('node:fs');
const path = require("node:path");
const commandsPath = path.join(__dirname);

function CreateString(User, place){
    return `\`\`${place}.\`\` **${User.userName}** з довжиною __${User.DickGame.userDickLength} см__.\n`;
}


function CreateWorldRating(UserArr){
    let linesCount;
    let ratingString = "";

    if (UserArr.length > 10)
        linesCount = 10;
    else
        linesCount = UserArr.length;

    for(let i = 0; i < linesCount; i++){
        ratingString += CreateString(UserArr[i], i + 1);
    }

    return ratingString;
}

function CreateEmbed(UserArr, ourUserData, place){
    let str =  CreateWorldRating(UserArr);

    let yourStr = "";

    if (typeof ourUserData === 'undefined') {
        yourStr = `Ви ще не користувалися грою`;
    }else{
        yourStr = `\`\`${place}.\`\` Довжина: __${ourUserData.DickGame.userDickLength} см__.\n`;
    }

    let answerEmbed = new MessageEmbed()
        .setColor('#ec1c25')
        .setTitle(`🌍 Світовий рейтинг маленьких дружків 🍌`)
        .addFields(
            { name: '📊 Загальний:', value: str },
            { name: '\u200B', value: '\u200B' },
            { name: '💪🏼 Ваше місце:', value: yourStr, inline: true },
        )
        .setFooter({ text: 'Bot by Boy From God#2772', iconURL: 'https://cdn.discordapp.com/avatars/390561515054563328/a7aaa462df02317dbcf4c0a649fe6321.webp?size=128' });

    return answerEmbed;

}

function ShowLeaderBoard(interaction)
{
    let place;
    let UserArr = JSON.parse(fs.readFileSync(commandsPath+"\\../users.json", "utf8"));
    UserArr.sort(function (a, b) {
        return b.DickGame.userDickLength - a.DickGame.userDickLength;
    })
    let ourUserData = UserArr.find(function (item, index, array) {
        if (item.userId == interaction.member?.id) {
            place = index + 1;
            return true;
        } else {
            return false;
        }
    });

    return CreateEmbed(UserArr, ourUserData, place);
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('dickleaderboard')
        .setDescription('Побачити лідербоард світу по грі у найбільшу піпіську'),
    async execute(interaction) 
    {
        const embed = ShowLeaderBoard(interaction);

        interaction.reply({
            embeds: [embed]
        });
    }
}
