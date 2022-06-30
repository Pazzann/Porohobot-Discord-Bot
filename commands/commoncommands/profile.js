const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const fs = require('node:fs');
const path = require("node:path");
const {User} = require("../../classes/User");
const commandsPath = path.join(__dirname);

function GetData(interaction){
    let UserArr = JSON.parse(fs.readFileSync(commandsPath+"\\../users.json", "utf8"));

    let ourUserData = UserArr.find(function (item, index, array) {
        if (item.userId == interaction.member?.id) {
            place = index + 1;
            return true;
        } else {
            return false;
        }
    });
    if (typeof ourUserData === 'undefined') {
        UserArr.push(new User(interaction));
        ourUserData = UserArr[UserArr.length - 1];
        fs.writeFileSync(commandsPath+"\\../users.json", JSON.stringify(UserArr, null, 2));
    }
    return ourUserData;
}

function GetEmbed(interaction){

    const ourUserData = GetData(interaction);


    return createEmbed(ourUserData, interaction.member?.user);
}

function createEmbed(ourUserData, user){
    let Embed = new MessageEmbed()
        .setColor(`#ffdfff`)
        .setTitle(`__**${ourUserData.userName.split('#')[0]}**__`)
        .setThumbnail(user.avatarURL())
        .setDescription(`⠀•⠀⠀Ваш айді: __*${ourUserData.userId}*__
                         ⠀•⠀⠀Ваш аккаунт створено: __*${user.createdAt.getDate()}.${user.createdAt.getMonth()}.${user.createdAt.getFullYear()}*__ 
                         ⠀•⠀⠀Ваш тег: __*${ourUserData.userName.split('#')[1]}*__`)
        .addFields(
            { name: '\u200B', value: '\u200B' },
            { name: '🍌 **DickGame** 📊', value: `\u200B
                                                 ⠀💪⠀Довжина: __*${ourUserData.DickGame.userDickLength} см*__
                                                 \u200B
                                                 ⠀◈⠀⠀Усього спроб: __*${ourUserData.DickGame.timesCalled}*__
                                                 ⠀◈⠀⠀Гарних спроб: __*${ourUserData.DickGame.goodTries}*__
                                                 ⠀◈⠀⠀Поганих спроб: __*${ourUserData.DickGame.badTries}*__
                                                 ⠀◈⠀⠀Всього вирісло: __*${ourUserData.DickGame.totalGrowth}*__
                                                 ⠀◈⠀⠀Всього зменьшилося: __*${ourUserData.DickGame.totalDownGrade}*__` },
        );
    return Embed;
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Показуе ваш профіль.'),
    async execute(interaction) {
        const Embed = GetEmbed(interaction)
        interaction.reply({
            embeds: [Embed]
        })
    }
}

