const SessionModel = require('../../Model/mongoModels/SessionModel')
const UserModel = require('../../Model/mongoModels/UserModel')
const xpCalculator = require('./xpCalculator')

function create(userId, username, channelId, channelName) {
    const newSession = new SessionModel({
        userId: userId,
        username: username,
        sessionStart: Date.now(),
        actions: [{
            timestamp: Date.now(),
            channelId: channelId,
            channelName: channelName,
            action: "joined",
            actionDescription: "Joined the channel"
        }]
    });
    try {
        newSession.save()
        console.log(`Started a session for: ${username}`)
    } catch (error) {
        console.error(`Error saving ${username}'s session: ${err}`)
    }
}
async function addAction (state, action, actionDescription) {
    userId =  state.member.user.id
    channelId = state.channel.id
    channelName = state.channel.name
    username = state.member.user.name
    try {
        const session = await SessionModel.findOne({userId}).sort({sessionStart: -1}).limit(1)
        if(!session){
            console.log("Can't find the session for user: "+username + " { "+ action+" }")
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
        console.log('Error while adding action for user: '+ username);
    }
}

async function addExperience(userId, serverId) {
    try { 
        const session = await SessionModel.findOne({userId}).sort({sessionStart: -1}).limit(1)
        if(!session){
            console.log(`Can't find the session for user: +${userId}`)
            return;
        } 
        const user = await UserModel.findOne({ id: userId, serverId: serverId })
        if (!user) {
            console.log(`User with userId ${userId} not found in server ${serverId}`)
            return;
        }
        const newXP = xpCalculator(session.actions)
        user.experience +=newXP

        await user.save();
        console.log(`Added ${newXP} experience for user ${user.username}`)
        return;
    } catch (error) {
        console.error(`Failed to add experience to user ${userId}: ${error}`)
    }
}

module.exports = {create, addAction, addExperience}