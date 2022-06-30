const path = require("node:path");
const fs = require("node:fs");
module.exports.RegCommands = function (commands, dirrname) {
    let commandsPath = path.join(__dirname, `../commands/${dirrname}`);

    let commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    let commandNames = commandFiles.map(file => file.slice(0, -3));
    console.log('\x1b[36m%s\x1b[0m', `Found and Registered `, "\x1b[43m", dirrname, '\x1b[36m%s\x1b[0m', ` commands:`);

    for (let i = 0; i < commandFiles.length; i++) {
        const filePath = path.join(commandsPath, commandFiles[i]);
        const command = require(filePath);
        console.log("\x1b[32m", commandNames[i]);
        commands.set(commandNames[i], command);

    }
    return commands;
}