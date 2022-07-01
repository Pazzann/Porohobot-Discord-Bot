const fs = require('node:fs');
const path = require("node:path");
const {FullPlayer, Playlist} = require("../classes/Music");


let themes = new Map();


themes.set("історичні", [
    new Playlist(
        "Лор",
        `__*Історичні пісні про Україну*__
         **Включа:** пісні про козаків, УНР та інші...`,
        "https://www.youtube.com/playlist?list=PLaJ1dlOqZMxqN1-UwWi-Dj_9yXgW89Q6U"),
    new Playlist(
        "Махно",
        `__*Історичні пісні про Махно*__
         **Включає** різні пісні такі як анархія мама та інші...`,
        "https://www.youtube.com/playlist?list=PLaJ1dlOqZMxoGJErZoxeitfxXSTBdsw_3"),
]);
themes.set("рок", [
    new Playlist(
        "Рок та Метал бойовий",
        `__*Український бойовий рок*__
         **Включає:** Пирятин, Тінь Сонця, Орест Лютий, Скрябін та інші...`,
        "https://www.youtube.com/playlist?list=PLaJ1dlOqZMxrky5bSLFeQhaqcjGfzUbki"),
    new Playlist(
        "Жадан і Собаки",
        `__*Найкращі пісні цього виконавця*__
         **Включає:** Мальви, Автозак та інші...`,
        "https://www.youtube.com/playlist?list=PLAqSgtACVISFe77VOiGucndZelDuHGdiw"),
    new Playlist(
        "Український побутовий рок",
        `__*Плейліст ще в розробці*__
         **Включає:** ...`,
        "https://www.youtube.com/playlist?list=PLAqSgtACVISFXKRlCl2s1UjGFtBLnbKCB"),
]);
themes.set("поп", [
    new Playlist(
        "Попса",
        `__*Українська крінжова попса на тему війни і не тільки*__
        **Включає:** Океан Ельзи, THMK, Go_A та інші...`,
        "https://www.youtube.com/playlist?list=PLaJ1dlOqZMxrr5GA_3-qJGakvCMGjmUPF"),
]);

themes.set("постпанк", [
    new Playlist(
        "Український постпанк",
        `__*Плейліст ще в розробці*__
         **Включає:** ...`,
        "https://www.youtube.com/playlist?list=PLAqSgtACVISFqAeVO9CEV-uzJLPNeH3Q2"),
    new Playlist(
        "Містморн",
        `__*Найкращі пісні цього виконавця*__
         **Включає:** Дідько я у розпачі, Панельні будинки та інші...`,
        "https://www.youtube.com/playlist?list=PLAqSgtACVISH4IcyYCWA_2Dz9ZjHA1p0e"),
]);

const fullPlayer = new FullPlayer(themes);
const musicPath = path.join(__dirname);

fs.writeFileSync(musicPath + "\\playlist.json", JSON.stringify(fullPlayer, null, 2));

console.log("Succesfully added music");
