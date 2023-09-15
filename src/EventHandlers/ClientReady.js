module.exports = (client) => {
    client.on('ready', c=>{
        console.log(`✅ ${c.user.username} is online`);
    })
}
