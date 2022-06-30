const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');

const fs = require('node:fs');
const {User} = require('../../classes/User');
const path = require("node:path");
const commandsPath = path.join(__dirname);

const { DickDraw } = require('../../functions/DickDraw');



function GetYourDick(interaction) {
    let UserArr = JSON.parse(fs.readFileSync(commandsPath + "\\../users.json", "utf8"));
    let ourUserData = UserArr.find(function (item, index, array) {
        if (item.userId == interaction.member?.id) {
            return true;
        } else {
            return false;
        }
    });

    if (typeof ourUserData === 'undefined') {
        UserArr.push(new User(interaction));
        ourUserData = UserArr[UserArr.length - 1];
        fs.writeFileSync(commandsPath + "\\../users.json", JSON.stringify(UserArr, null, 2));
    }


    return ourUserData;
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('mydick')
        .setDescription('Показуе ваш ....'),
    async execute(interaction) {
        const User = GetYourDick(interaction);

        const embed = new MessageEmbed()
            .setColor('#5e96ff')
            .setTitle("**" + DickDraw(User.DickGame.userDickLength) + "**")
            .setDescription(`📖 Врешті решт, ваш маленький друг ${User.DickGame.userDickLength} см!`);


        interaction.reply({
            embeds: [embed]
        })
    }
}
