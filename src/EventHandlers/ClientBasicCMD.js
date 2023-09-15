const BasicCMDService = require('../Services/BasicCMDService/ezb')
module.exports = (client) => {
    client.on('messageCreate', msg => {
        if(msg.content === 'ezb'){
            BasicCMDService(msg)
        }  
    })
}