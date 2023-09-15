const {ApplicationCommandOptionType} = require('discord.js')

module.exports = {
    name: 'xp',
    description: 'Shows the experience a person has',
    options: [
        {
            name: "name",
            description: "Enter either the username or the globalName",
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ]
}