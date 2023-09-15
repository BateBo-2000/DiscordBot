const stringList = require('./StringList')
module.exports = (msg) => {
    if(msg.author.username && msg.author.username != 'KilleraBot') console.log(msg.author.username+' used ezb command'); 
    const stringListLenght = stringList.length
    const random = Math.floor( Math.random()* stringListLenght)
    msg.reply(`${msg.author.globalName} ${stringList[random]}`)   
}