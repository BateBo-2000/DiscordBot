const UserModel = require('../../Model/mongoModels/UserModel')

async function addUserIfMissing(userId, userObject) {
    if (!userObject || !userObject.user) {
        console.log(`Invalid userObject for userId: ${userId}`)
        return;
    }

    if (await isUserAdded(userId) === false) {
        const newUser = new UserModel({
            id: userObject.user.id,
            username: userObject.user.username,
            globalName: userObject.user.globalName,
            discriminator: userObject.user.discriminator,
            avatar: userObject.user.avatar,
            bot: userObject.user.bot,
            system: userObject.user.system,
            experience: 1
        });
        try {
            await newUser.save();
            console.log(`Added user ${userObject.user.username}`)
        } catch (error) {
            console.log(`Failed to add user ${userObject.user.username}: ${error}`)
        }
    }else{
        console.log(`Data found for user ${userObject.user.username}`)
    }
}

async function isUserAdded(userId) {
    const user = await UserModel.findOne({ id: userId })
    return !!user
}

module.exports = { addUserIfMissing }
