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

// function timeline (userActions) {
//     const timeline = []
//     const timelineTimeZero = userActions[0].timestamp
//     userActions.forEach(action => {
//     timeline.push([action.timestamp - timelineTimeZero, action.action] ) 
//     });
//     return timeline
// }

function timeInAction (userActions, action){
    let time = 0
    userActions.forEach((element, index) => {
        if(element.action === '+'+action){
            let startTime = element.timestamp*1
            let endTime = 0
            for(let i = index+1; i < userActions.length; i++){
                if(userActions[i].action === '-'+action){
                    endTime = userActions[i].timestamp*1
                    break
                }
            }
            if(endTime === 0){
                endTime = userActions[userActions.length-1].timestamp*1
            }
            console.log(endTime,startTime,time);
            time += endTime - startTime
        }
    });
    return time
}