const SessionModel = require('../../Model/mongoModels/SessionModel')
const UserModel = require('../../Model/mongoModels/UserModel')
const statsCalculator = require('./statisticsCalculator')

function create(newState) {
    const newSession = new SessionModel({
        userId: newState.member.user.id,
        username: newState.member.user.username,
        serverId: newState.guild.id,
        serverName: newState.guild.name,
        sessionStart: Date.now(),
        actions: [{
            timestamp: Date.now(),
            channelId: newState.channel.id,
            channelName: newState.channel.name,
            action: "joined",
            actionDescription: "Joined the channel"
        }]
    });
    try {
        newSession.save()
        console.log(`Started a session for: ${newState.member.user.username}`)
    } catch (error) {
        console.error(`Error saving ${newState.member.user.username}'s session: ${err}, SessionManager: create`)
    }
}
async function addAction (state, action, actionDescription) {
    userId =  state.member.user.id
    channelId = state.channel.id
    channelName = state.channel.name
    username = state.member.user.username
    serverId = state.guild.id
    try {
        const session = await SessionModel.findOne({userId:userId}).sort({sessionStart: -1})
        if(!session){
            console.log("Can't find the session for user: "+username + " { "+ action+" }, SessionManager: addAction")
            return null;
        }  
        session.actions.push({
            timestamp: Date.now(),
            channelId: channelId,
            channelName: channelName,
            action: action,
            actionDescription: actionDescription
        })
        await session.save()
        console.log(`Action added for user ${username} in server ${state.guild.name}`)  
    } catch (error) {
        console.log('Error while adding action for user: '+ username+", SessionManager: addAction");
    }
}

async function addExperience(userId, serverId) {
    try { 
        const session = await SessionModel.findOne({userId:userId, serverId:serverId}).sort({sessionStart: -1})
        if(!session){
            console.log(`Can't find the session for user: +${userId}, SessionManager: addExperience`)
            return;
        } 
        const user = await UserModel.findOne({ id: userId, serverId: serverId })
        if (!user) {
            console.log(`User with userId ${userId} not found in server ${serverId}, SessionManager: addExperience`)
            return;
        }
        const sessionStats = statsCalculator(session.actions)
        console.log(sessionStats);
        const newXP = sessionStats.XP
        const newtimeInChat = sessionStats.timeInChat
        const timeMutedOrDeafed =  sessionStats.timeMuted + sessionStats.timeServerMuted + sessionStats.timeServerDeafed + sessionStats.timeDeafed
        const timeVideo = sessionStats.timeVideo
        const timeStreaming = sessionStats.timeStreaming

        user.experience +=newXP || 0
        user.timeVoiceChat += newtimeInChat || 0
        user.timeDeafedOrMute += timeMutedOrDeafed || 0
        user.timeVideo += timeVideo || 0
        user.timeStreaming += timeStreaming || 0

        await user.save();
        console.log(`Added ${newXP} experience and stats for user ${user.username}`)
        return;
    } catch (error) {
        console.error(`Failed to add experience to user ${userId}: ${error}, SessionManager: addExperience
        ${error}`)
    }
}

module.exports = {create, addAction, addExperience}