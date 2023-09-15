const {EmbedBuilder} = require('discord.js')

module.exports = (links, limit = 10) => {
    const embedsArray = [] 
    for (let i = 0; i < links.length && i < limit ; i++ ) {
        embedsArray.push(createEmbededImage(links[i], 0xFFC0CB));
    }
    return embedsArray 
}

function createEmbededImage (link, color) {
    const embed = new EmbedBuilder().setColor(color).setImage(link)
    return embed
}
