const fs = require('node:fs');
const path = require("node:path");
const {FullPlayer, Playlist} = require("../classes/Music");


let themes = new Map();


themes.set("історичні", [
    new Playlist("лор", "Історичні пісні про Україну", "https://www.youtube.com/playlist?list=PLaJ1dlOqZMxqN1-UwWi-Dj_9yXgW89Q6U"),
    new Playlist("махно", "Пісні про Махно", "https://www.youtube.com/playlist?list=PLaJ1dlOqZMxoGJErZoxeitfxXSTBdsw_3"),]);
themes.set("рок", [
    new Playlist("Рок та Метал", "Український Рок", "https://www.youtube.com/playlist?list=PLaJ1dlOqZMxrky5bSLFeQhaqcjGfzUbki"),]);
themes.set("поп", [
    new Playlist("попса", "Українська крінжова попса", "https://www.youtube.com/playlist?list=PLaJ1dlOqZMxrr5GA_3-qJGakvCMGjmUPF"),]);

const fullPlayer = new FullPlayer(themes);
const musicPath = path.join(__dirname);

fs.writeFileSync(musicPath + "\\playlist.json", JSON.stringify(fullPlayer, null, 2));

console.log("Succesfully added music");
