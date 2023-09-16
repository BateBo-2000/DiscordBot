const {RandomRule34Image, Rule34Tagged} = require('../Services/R34Service.js/Rule34Service')
const xpCommandHandler = require('./../Services/VoiceChatService/XpCommandHandler')
module.exports = (client) => {
    // r34 cmd
    client.on('interactionCreate', msg => {
        if(msg.commandName === 'r34'){
            RandomRule34Image(msg)
        } 
    })
    client.on('interactionCreate', msg => {
        if(msg.commandName === 'r34taglatest'){
            Rule34Tagged(msg)
        } 
    })
    client.on('interactionCreate', msg => {
        if(msg.commandName === 'xp'){
            xpCommandHandler(msg)
        } 
    })
    client.on('interactionCreate', msg => {
        if(msg.commandName === 'stats'){
            xpCommandHandler(msg)
        } 
    })
}
