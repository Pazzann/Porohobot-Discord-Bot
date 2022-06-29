module.exports.FullPlayer = class {
    constructor(themes) {
        for (let [theme, playLists] of themes.entries()) {
            this[theme] = playLists;
        }


    }
}


module.exports.Playlist = class {
    constructor(name, description, url) {
        this.playlistName = name;
        this.playlistDescription = description;
        this.playlistUrl = url;
    }
}