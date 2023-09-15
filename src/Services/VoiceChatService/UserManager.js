const UserModel = require('../../Model/mongoModels/UserModel')

async function addUserIfMissing(newState) {
    if (!newState.member || !newState.member.user) {
        console.log(`Invalid newState.member for userId: ${newState.member.user.id}`)
        return;
    }
    if (await isUserAdded(newState.member.user.id, newState.guild.id) === false) {
        const newUser = new UserModel({
            id: newState.member.user.id,
            username: newState.member.user.username,
            globalName: newState.member.user.globalName,
            discriminator: newState.member.user.discriminator,
            avatar: newState.member.user.avatar,
            bot: newState.member.user.bot,
            system: newState.member.user.system,
            experience: 1,
            serverId: newState.guild.id,
            serverName: newState.guild.name
        });
        try {
            await newUser.save();
            console.log(`Added user ${newState.member.user.username} in server ${newState.guild.name}`)
        } catch (error) {
            console.log(`Failed to add user ${newState.member.user.username}: ${error}`)
        }
    }else{
        console.log(`Data found for user ${newState.member.user.username}`)
    }
}

async function isUserAdded(userId, guildId) {
    const user = await UserModel.findOne({ id: userId, serverId: guildId })
    return !!user
}

module.exports = { addUserIfMissing }
