const {Client, IntentsBitField, GatewayIntentBits} = require ('discord.js')

const intents = [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
]

const client = new Client ({
    intents: [intents]
})

module.exports = client