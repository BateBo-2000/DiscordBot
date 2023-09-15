const UserModel = require('./../../Model/mongoModels/UserModel')

module.exports = async (msg) => {
    console.log(`${msg.user.username} used xp command in server ${msg.guild.name}`);
    try {
        const name = msg?.options?.get('name')?.value
        if(name){
            
                let user = await UserModel.findOne({globalName: name, serverId: msg.guild.id})
                if(!user) user = await UserModel.findOne({username: name, serverId: msg.guild.id})
                if(!user){
                    return msg.reply('Error finding this user!')
                }
                const xp = user.experience
                if(xp){
                    return msg.reply(`${name} has ${user.experience} Xp`)
                }else{
                    return msg.reply(`You still dont have Xp :(! \n To fix get in and out of the channel and try again ...`)
                }
                
            
            
        }else{
            const user = await UserModel.findOne({ id: msg.user.id, serverId: msg.guild.id})
            if (!user) {
                console.log(`Can't find ${msg.user.username}`)
                return msg.reply("Can't find profile :(! \n To fix get in and out of the channel and try again ...")
            }
            const xp = user.experience
            if(xp){
                return msg.reply(`${msg.user.username} has ${user.experience} Xp`)
            }else{
                return msg.reply(`You still dont have Xp :(! \n To fix get in and out of the channel and try again ...`)
            }  
        }
    } catch (error) {
        console.log('Error trying to fufil xpCommand:', error);
        return msg.reply('Something went wrong! :(')  
    }
}