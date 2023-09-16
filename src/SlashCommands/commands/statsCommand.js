const {ApplicationCommandOptionType} = require('discord.js')

module.exports = {
    name: 'stats',
    description: 'Shows the statistics for a person has',
    options: [
        {
            name: "name",
            description: "Enter either the username or the globalName",
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ]
}