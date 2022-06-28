//discord part
const { SlashCommandBuilder } = require('@discordjs/builders');

const { MessageEmbed } = require('discord.js');

const fs = require('node:fs');
const { User } = require('./classes/User');
const path = require("node:path");
const commandsPath = path.join(__dirname);

const { DickDraw } = require('./methods/DickDraw');

function GetRandomDickAddition(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

let growthOneTime;

function GrowDick(interaction)
    {
        let indexOfItemChange;
        let UserArr = JSON.parse(fs.readFileSync(commandsPath+"\\users.json", "utf8"));
        let ourUserData = UserArr.find(function (item, index, array) {
            if (item.userId == interaction.member?.id) {
                indexOfItemChange = index;
                return true;
            } else {
                return false;
            }
        });

        if (typeof ourUserData === 'undefined') {
            UserArr.push(new User(interaction));
            ourUserData = UserArr[UserArr.length - 1];
            indexOfItemChange = UserArr.length - 1;
        }

        ourUserData.DickGame.timesCalled++;

        growthOneTime = GetRandomDickAddition(-2, 2);

        if (growthOneTime > 0) {
            ourUserData.DickGame.totalGrowth += growthOneTime;
            ourUserData.DickGame.goodTries++;
        }
        else {
            ourUserData.DickGame.totalDownGrade += growthOneTime;
            ourUserData.DickGame.badTries++;
        }

        ourUserData.DickGame.userDickLength += growthOneTime;

        UserArr[indexOfItemChange] = ourUserData;
        fs.writeFileSync(commandsPath+"\\users.json", JSON.stringify(UserArr, null, 2));

        return ourUserData.DickGame.userDickLength;
    }



module.exports = {
	data: new SlashCommandBuilder()
		.setName('dick')
		.setDescription('Гра в кого найбільший ....'),
    async execute(interaction) 
    {
        const answer = GrowDick(interaction);

        let str;
        if(growthOneTime>0){
            str = "💪🏼 Ваш маленький друг __**ВИРІС**__ на " + growthOneTime + " і тепер він " + answer + " см.";
        }else if(growthOneTime<0){
            str = "👇🏼 Ваш маленький друг __**ЗМЕНЬШИВСЯ**__ на " + growthOneTime * (-1) + " і тепер він " + answer + " см.";
        }else{
            str = "😥 Ваш маленький друг __**НЕ ВИРІС**__ і він залишився " + answer + " см.";
        }
        const embed = new MessageEmbed()
            .setColor('#99ff85')
            .setTitle(DickDraw(answer))
            .setDescription(str);

        interaction.reply(
            { embeds: [embed] }
        );
    }
}