const UserModel = require('./../../Model/mongoModels/UserModel')

module.exports = async (msg) => {
    console.log(`${msg.user.username} stats xp command in server ${msg.guild.name}`);
    try {
        const name = msg?.options?.get('name')?.value
        if(name){
                let user = await UserModel.findOne({globalName: name, serverId: msg.guild.id})
                if(!user) user = await UserModel.findOne({username: name, serverId: msg.guild.id})
                if(!user){
                    return msg.reply('Error finding this user!')
                }
        }else{
            const user = await UserModel.findOne({ id: msg.user.id, serverId: msg.guild.id})
            if (!user) {
                console.log(`Can't find ${msg.user.username}`)
                return msg.reply("Can't find profile :(! \n To fix get in and out of the channel and try again ...")
            }
        }

        const timeVoiceChat = secondsToTime(user.timeVoiceChat)
        const timeDeafedOrMute = secondsToTime(user.timeDeafedOrMute)
        const timeVideo = secondsToTime(user.timeVideo)
        const timeStreaming = secondsToTime(user.timeStreaming)
        
        return msg.reply(`${name} has been: 
            \n ${timeVoiceChat} in a voice call,
            \n ${timeDeafedOrMute} deaf or mute in a voice call,
            \n ${timeVideo} with camera on,
            \n ${timeStreaming} streaming!
            \n Disclamer: To add current call's stats just leave and join the channel again!`)

    } catch (error) {
        console.log('Error trying to fufil statsCommand:', error);
        return msg.reply('Something went wrong! :(')  
    }
}

function secondsToTime(seconds) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
  
    return timeString;
  }