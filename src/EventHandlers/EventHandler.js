const ClientReady = require("./ClientReady")
const ClientBasicCMD = require("./ClientBasicCMD")
const ClientInteractions = require("./ClientInteractions")
const ClientVoiceChats = require("./ClientVoiceChats")

module.exports = (client) => { 
    try {
        ClientReady(client)
    } catch (error) {
        console.log('❌ Client ready not working ...');
    } 
    try {
        ClientBasicCMD(client)
    } catch (error) {
        console.log('❌ Client Basic CMD not working ...');
    }
    try {
        ClientInteractions(client)
    } catch (error) {
        console.log('❌ Client Interactions not working ...');
    }
    try {
        ClientVoiceChats(client)
    } catch (error) {
        console.log('❌ Client Voice Events not working ...');
    }
    console.log('✔ Events ready...');
}
