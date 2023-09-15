const {ApplicationCommandOptionType} = require('discord.js')

module.exports = {
    name: 'r34taglatest',
    description: 'Search latest by tag',
    options: [
        {
            name: "tags",
            description: "Enter the tag /multyple tags separated with +/",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "amount",
            description: "Max 10",
            type: ApplicationCommandOptionType.Number,
            required: false
        }
    ]
}