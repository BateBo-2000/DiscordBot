const VoiceChatDetectionService = require('../Services/VoiceChatService/VoiceChatDetectionService')
module.exports = (client) => {
    client.on('voiceStateUpdate', (oldState, newState) => {
        VoiceChatDetectionService(oldState, newState)
    });
}