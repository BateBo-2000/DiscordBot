require('dotenv').config()
const {REST, Routes} = require('discord.js')

const rest = new REST({version: 10}).setToken(process.env.TOKEN)

module.exports  = async (commands, guild_id) => {
    try {
        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                guild_id
            ),
            {body:commands}
        )
    } catch (error) {
        console.log('❌ Commands failed to register ...', error); 
    }
}

