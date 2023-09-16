require('dotenv').config()
const register = require('./Register')
const r34Command = require('./commands/r34Command') 
const r34WithTags = require('./commands/r34WithTags')
const xpCommand = require('./commands/xpCommand')
const statsCommand = require('./commands/statsCommand')

const commands = []

commands.push(r34Command)
commands.push(r34WithTags)
commands.push(xpCommand)
commands.push(statsCommand)

module.exports = () => {
    // Test server
    register(commands, process.env.TESTGUILD_ID)
    // Killera
    register(commands, process.env.KILLERA_ID)
    // Imashti vzimashti
    register(commands, process.env.IMASHTI_VZIMASHTI)

    console.log("✔ Commands registered ...");
}




