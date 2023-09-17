const UserModel = require('./../../Model/mongoModels/UserModel')
const {EmbedBuilder} = require('discord.js')

module.exports = async (msg) => {
    console.log(`${msg.user.username} stats command in server ${msg.guild.name}`);
    try {
        let name = msg?.options?.get('name')?.value
        let user
        if(name){
                user = await UserModel.findOne({globalName: name, serverId: msg.guild.id})
                if(!user) user = await UserModel.findOne({username: name, serverId: msg.guild.id})
                if(!user){
                    return msg.reply('Error finding this user!')
                }
        }else{
            user = await UserModel.findOne({ id: msg.user.id, serverId: msg.guild.id})
            if (!user) {
                console.log(`Can't find ${msg.user.username}`)
                return msg.reply("Can't find profile :(! \n To fix get in and out of the channel and try again ...")
            }
            name = user.username
        }
        const timeVoiceChat = secondsToTime(user.timeVoiceChat)
        const timeDeafedOrMute = secondsToTime(user.timeDeafedOrMute)
        const timeVideo = secondsToTime(user.timeVideo)
        const timeStreaming = secondsToTime(user.timeStreaming)
        
        const embed = new EmbedBuilder()
            .setTitle(`${name} has:`)
            .setDescription(
                `${timeVoiceChat} H in a voice call,
                ${timeDeafedOrMute} H deaf or mute in a voice call,
                ${timeVideo} H with the camera on,
                ${timeStreaming} H streaming!
                \nDisclaimer: To add current call's stats, just leave and join the channel again!`
            )
            .setColor('#3498db')

        return msg.reply({embeds:[embed]})

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
