const {create, addAction, addExperience} = require ('./SessionManager')
const {addUserIfMissing} = require ('./UserManager')


module.exports = (oldState, newState) => {
    //determines what the action is and acts accordingly

    ServerMuteAction(oldState, newState)
    ServerDeafAction(oldState, newState)
    SelfMuteAction(oldState, newState)
    SelfDeafAction(oldState, newState)
    MovementAction(oldState, newState)
    SelfVideoAction(oldState, newState)
    StreamingAction(oldState, newState)

}

function ServerMuteAction(oldState, newState) {
    if (oldState.serverMute === false && newState.serverMute === true) {
          addAction(
               newState,
               `+serverMute`, 
               `${newState.member.user.username} was server-muted in voice channel ${newState.channel.name}`
          )
    }
    if (oldState.serverMute === true && newState.serverMute === false) {
          addAction(
               newState,
               `-serverMute`, 
               `${newState.member.user.username} was unmuted from the server in voice channel ${newState.channel.name}`
          )
    }
}

function ServerDeafAction(oldState, newState) {
    if (oldState.serverDeaf === false && newState.serverDeaf === true) {
          addAction(
               newState,
               `+serverDeaf`, 
               `${newState.member.user.username} was server-deafened in voice channel ${newState.channel.name}`
          )
    }
    if (oldState.serverDeaf === true && newState.serverDeaf === false) {
          addAction(
               newState,
               `-serverDeaf`, 
               `${newState.member.user.username} was undeafened from the server in voice channel ${newState.channel.name}`
          )
    }
}

function SelfMuteAction(oldState, newState) {
    if (oldState.selfMute === false && newState.selfMute === true && newState.selfDeaf === false) {
          addAction(
               newState,
               `+mute`, 
               `${newState.member.user.username} self-muted in voice channel ${newState.channel.name}`
          )
    }
    if (oldState.selfMute === true && newState.selfMute === false) {
          addAction(
               newState,
               `-mute`, 
               `${newState.member.user.username} self-unmuted in voice channel ${newState.channel.name}`
          )
    }
}

function SelfDeafAction(oldState, newState) {
    if (oldState.selfDeaf === false && newState.selfDeaf === true) {
          addAction(
               newState,
               `+deaf`, 
               `${newState.member.user.username} self-deafened in voice channel ${newState.channel.name}`
          )
    }
    if (oldState.selfDeaf === true && newState.selfDeaf === false) {
          addAction(
               newState,
               `-deaf`, 
               `${newState.member.user.username} self-undeafened in voice channel ${newState.channel.name}`
          )
    }
}

async function MovementAction(oldState, newState) {
     if (oldState.channel !== newState.channel && !oldState.channel) {
          addUserIfMissing(newState)
          create(newState)
          if(newState.selfMute) addAction(
               newState,
               `+mute`, 
               `${newState.member.user.username} joined self-mute in voice channel ${newState.channel.name}`
          )
          if(newState.selfDeaf) addAction(
               newState,
               `+deaf`, 
               `${newState.member.user.username} joined self-deaf in voice channel ${newState.channel.name}`
          )
          if(newState.serverMute) addAction(
               newState,
               `+serverMute`, 
               `${newState.member.user.username} joined server-muted in voice channel ${newState.channel.name}`
          )
          if(newState.serverDeaf) addAction(
               newState,
               `+serverDeaf`, 
               `${newState.member.user.username} joined server-deafed in voice channel ${newState.channel.name}`
          )
     }
    if (oldState.channel !== newState.channel && !newState.channel) {
          await addAction(
               oldState,
               `left`, 
               `${oldState.member.user.username} has left channel ${oldState.channel.name}`,
          )
          addExperience(oldState.member.user.id, oldState.guild.id)
    }
    if (oldState.channel !== newState.channel && oldState.channel && newState.channel) {
          addAction(
               newState,
               `moved`, 
               `${newState.member.user.username} has been moved from channel ${oldState.channel.name} to ${newState.channel.name}`
          )
    }
}

function SelfVideoAction(oldState, newState) {
    if (oldState.selfVideo === false && newState.selfVideo === true) {
          addAction(
               newState,
               `+video`, 
               `${newState.member.user.username} started camera in voice channel ${newState.channel.name}`
          )
    }
    if (oldState.selfVideo === true && newState.selfVideo === false) {
          addAction(
               newState,
               `-video`, 
               `${newState.member.user.username} stopped camera in voice channel ${newState.channel.name}`
          )
    }
}

function StreamingAction(oldState, newState) {
    if (oldState.streaming === false && newState.streaming === true) {
          addAction(
               newState,
               `+stream`, 
               `${newState.member.user.username} started streaming in voice channel ${newState.channel.name}`
          )
    }
    if (oldState.streaming === true && newState.streaming === false) {
          addAction(
               newState,
               `-stream`, 
               `${newState.member.user.username} stopped streaming in voice channel ${newState.channel.name}`
          )
    }
}

