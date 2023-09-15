require('dotenv').config()
const client = require('./Client/Client')
const HandleEvents = require('./EventHandlers/EventHandler')
const CommandsRegister = require('./SlashCommands/CommandsRegister')
const {connectToMongo} = require('./Model/DatabaseClient')


// setup
HandleEvents(client)
CommandsRegister()
connectToMongo()

// Login with the Discord bot token
try {
    client.login(process.env.TOKEN);
} catch (error) {
    console.error('Error during login:', error);
}