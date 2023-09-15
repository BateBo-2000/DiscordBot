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
               newState.member.user.id, 
               newState.channel.id, 
               newState.channel.name,
               `+serverMute`, 
               `${newState.member.user.username} was server-muted in voice channel ${newState.channel.name}`,
               newState.member.user.username
          )
    }
    if (oldState.serverMute === true && newState.serverMute === false) {
          addAction(
               newState.member.user.id, 
               newState.channel.id, 
               newState.channel.name,
               `-serverMute`, 
               `${newState.member.user.username} was unmuted from the server in voice channel ${newState.channel.name}`,
               newState.member.user.username
          )
    }
}

function ServerDeafAction(oldState, newState) {
    if (oldState.serverDeaf === false && newState.serverDeaf === true) {
          addAction(
               newState.member.user.id, 
               newState.channel.id, 
               newState.channel.name,
               `+serverDeaf`, 
               `${newState.member.user.username} was server-deafened in voice channel ${newState.channel.name}`,
               newState.member.user.username
          )
    }
    if (oldState.serverDeaf === true && newState.serverDeaf === false) {
          addAction(
               newState.member.user.id, 
               newState.channel.id, 
               newState.channel.name,
               `-serverDeaf`, 
               `${newState.member.user.username} was undeafened from the server in voice channel ${newState.channel.name}`,
               newState.member.user.username
          )
    }
}

function SelfMuteAction(oldState, newState) {
    if (oldState.selfMute === false && newState.selfMute === true && newState.selfDeaf === false) {
          addAction(
               newState.member.user.id, 
               newState.channel.id, 
               newState.channel.name,
               `+mute`, 
               `${newState.member.user.username} self-muted in voice channel ${newState.channel.name}`,
               newState.member.user.username
          )
    }
    if (oldState.selfMute === true && newState.selfMute === false) {
          addAction(
               newState.member.user.id, 
               newState.channel.id, 
               newState.channel.name,
               `-mute`, 
               `${newState.member.user.username} self-unmuted in voice channel ${newState.channel.name}`,
               newState.member.user.username
          )
    }
}

function SelfDeafAction(oldState, newState) {
    if (oldState.selfDeaf === false && newState.selfDeaf === true) {
          addAction(
               newState.member.user.id, 
               newState.channel.id, 
               newState.channel.name,
               `+deaf`, 
               `${newState.member.user.username} self-deafened in voice channel ${newState.channel.name}`,
               newState.member.user.username
          )
    }
    if (oldState.selfDeaf === true && newState.selfDeaf === false) {
          addAction(
               newState.member.user.id, 
               newState.channel.id, 
               newState.channel.name,
               `-deaf`, 
               `${newState.member.user.username} self-undeafened in voice channel ${newState.channel.name}`,
               newState.member.user.username
          )
    }
}

async function MovementAction(oldState, newState) {
     if (oldState.channel !== newState.channel && !oldState.channel) {
          addUserIfMissing(newState.member.user.id, newState.member)
          create(
               newState.member.user.id, 
               newState.member.user.username, 
               newState.channel.id, 
               newState.channel.name
          )
          if(newState.selfMute) addAction(
               newState.member.user.id, 
               newState.channel.id, 
               newState.channel.name,
               `+mute`, 
               `${newState.member.user.username} joined self-mute in voice channel ${newState.channel.name}`,
               newState.member.user.username
          )
          if(newState.selfDeaf) addAction(
               newState.member.user.id, 
               newState.channel.id, 
               newState.channel.name,
               `+deaf`, 
               `${newState.member.user.username} joined self-deaf in voice channel ${newState.channel.name}`,
               newState.member.user.username
          )
          if(newState.serverMute) addAction(
               newState.member.user.id, 
               newState.channel.id, 
               newState.channel.name,
               `+serverMute`, 
               `${newState.member.user.username} joined server-muted in voice channel ${newState.channel.name}`,
               newState.member.user.username
          )
          if(newState.serverDeaf) addAction(
               newState.member.user.id, 
               newState.channel.id, 
               newState.channel.name,
               `+serverDeaf`, 
               `${newState.member.user.username} joined server-deafed in voice channel ${newState.channel.name}`,
               newState.member.user.username
          )
     }
    if (oldState.channel !== newState.channel && !newState.channel) {
          await addAction(
               oldState.member.user.id, 
               oldState.channel.id, 
               oldState.channel.name,
               `left`, 
               `${oldState.member.user.username} has left channel ${oldState.channel.name}`,
               newState.member.user.username
          )
          addExperience(oldState.member.user.id)
    }
    if (oldState.channel !== newState.channel && oldState.channel && newState.channel) {
          addAction(
               newState.member.user.id, 
               newState.channel.id, 
               newState.channel.name,
               `moved`, 
               `${newState.member.user.username} has been moved from channel ${oldState.channel.name} to ${newState.channel.name}`,
               newState.member.user.username
          )
    }
}

function SelfVideoAction(oldState, newState) {
    if (oldState.selfVideo === false && newState.selfVideo === true) {
          addAction(
               newState.member.user.id, 
               newState.channel.id, 
               newState.channel.name,
               `+video`, 
               `${newState.member.user.username} started camera in voice channel ${newState.channel.name}`,
               newState.member.user.username
          )
    }
    if (oldState.selfVideo === true && newState.selfVideo === false) {
          addAction(
               newState.member.user.id, 
               newState.channel.id, 
               newState.channel.name,
               `-video`, 
               `${newState.member.user.username} stopped camera in voice channel ${newState.channel.name}`,
               newState.member.user.username
          )
    }
}

function StreamingAction(oldState, newState) {
    if (oldState.streaming === false && newState.streaming === true) {
          addAction(
               newState.member.user.id, 
               newState.channel.id, 
               newState.channel.name,
               `+stream`, 
               `${newState.member.user.username} started streaming in voice channel ${newState.channel.name}`,
               newState.member.user.username
          )
    }
    if (oldState.streaming === true && newState.streaming === false) {
          addAction(
               newState.member.user.id, 
               newState.channel.id, 
               newState.channel.name,
               `-stream`, 
               `${newState.member.user.username} stopped streaming in voice channel ${newState.channel.name}`,
               newState.member.user.username
          )
    }
}

