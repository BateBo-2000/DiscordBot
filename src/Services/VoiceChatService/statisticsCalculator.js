module.exports = (userActions) => {
    const timeInTheChat = userActions[userActions.length-1].timestamp - userActions[0].timestamp
    const timeMuted = timeInAction(userActions, 'mute')
    const timeDeafed = timeInAction(userActions, 'deaf')
    const timeServerMuted = timeInAction(userActions, 'serverMute')
    const timeServerDeafed = timeInAction(userActions, 'serverDeaf')
    const timeVideo = timeInAction(userActions, 'video')
    const timeStreaming = timeInAction(userActions, 'stream')

    //the Xp formula
    
    let negativeEffects = timeMuted + timeDeafed + timeServerDeafed + timeServerMuted
    
    const positiveEffects = timeInTheChat + timeVideo*2 + timeStreaming
    if(positiveEffects < negativeEffects) negativeEffects = positiveEffects
    const timeWithEffects = positiveEffects - negativeEffects
    const XP = Math.floor(timeWithEffects/1000)
    return {
        XP:XP,
        timeInChat:timeInTheChat,
        timeMuted:timeMuted,
        timeDeafed:timeDeafed,
        timeServerMuted:timeServerMuted,
        timeServerDeafed:timeServerDeafed,
        timeVideo:timeVideo,
        timeStreaming:timeStreaming
    }
} 

function findActionIndex (userActions, action) {
    return userActions.findIndex(obj => obj.action === action)
}
// function timeline (userActions) {
//     const timeline = []
//     const timelineTimeZero = userActions[0].timestamp
//     userActions.forEach(action => {
//     timeline.push([action.timestamp - timelineTimeZero, action.action] ) 
//     });
//     return timeline
// }

function timeInAction(userActions, action, time = 0){
    let endIndex
    if(findActionIndex(userActions,'+'+action) >= 0){
        const startTime = userActions[findActionIndex(userActions,'+'+action)].timestamp 
        if(findActionIndex(userActions,'-'+action) >= 0){
            const endTime = userActions[findActionIndex(userActions,'-'+action)].timestamp
            time += endTime - startTime
            endIndex = findActionIndex(userActions,'-'+action)
        }else{
            const endTime = userActions[findActionIndex(userActions,'left')].timestamp
            time += endTime - startTime  
        }  
    }
    if(!endIndex){
        return time
    }else{
        const newUserActionsArray = userActions.slice(endIndex+1)
        return timeInAction(newUserActionsArray, action, time)
    } 
}