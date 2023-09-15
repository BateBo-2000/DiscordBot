const {EmbedBuilder} = require('discord.js') 
const R34CleanLink = require('./R34CleanLink')
const FetchText = require('../../Model/FetchText')
const { FindLink } = require('./LinksFinder')
const MassEmberder = require('../../Utils/MassEmberder')
const RangeEnforcer = require('../../Utils/RangeEnforcer')

async function RandomRule34Image (msg) {
    if(msg.user.username && msg.user.username != 'KilleraBot') console.log(msg.user.username+' used r34 command'); 
    const embed = new EmbedBuilder().setColor(0xFFC0CB)
    try {
        const imageUrl = await R34CleanLink() 
        try {
            embed.setImage(imageUrl)
            msg.reply({embeds: [embed]})
        } catch (error) {
            embed.setTitle("Error")
            msg.reply({embeds: [embed]})
        }
    } catch (error) {
        embed.setTitle('Error')
        msg.reply({embeds: [embed]})
    }     
}

async function Rule34Tagged (msg) {
    if(msg.user.username && msg.user.username != 'KilleraBot')  console.log(msg.user.username+' used r34latest command');  
    const tags = msg.options.get('tags').value
    let amount = RangeEnforcer(msg?.options?.get('amount')?.value, 1, 10)
    const embed = new EmbedBuilder().setColor(0xFFC0CB)
    let data = await FetchText(`https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${tags}&limit=20`)
    if(data){
        const linksCDN = FindLink(data, "https://api-cdn.rule34.xxx/images/")
        const linksWIMG = FindLink(data, "https://wimg.rule34.xxx/images/")
        const links = [...linksCDN, ...linksWIMG]
        if(links.length>0){
            msg.reply({embeds: MassEmberder(links, amount)})
        }else{
            embed.setTitle('No links found! :(')
            msg.reply({embeds: [embed]})
        }
    }else{
        embed.setTitle('Error')
        msg.reply({embeds: [embed]})
    }     
}

module.exports = {RandomRule34Image, Rule34Tagged}