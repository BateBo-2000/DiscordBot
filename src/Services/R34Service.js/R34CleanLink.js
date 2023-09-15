const FetchText = require('../../Model/FetchText')

 const R34CleanLink = async () => {
    const data = await FetchText("https://rule34.xxx/index.php?page=post&s=random")

    const searchTerm = "https://rule34.xxx//samples"
    const start = data.indexOf(searchTerm)

    if(start > 0){
        const end = data.substring(start, start+92).indexOf(`" id="im`)
        if(end > 0){
            return deepClean(data.substring(start, start+84))
            
        }else{
            return deepClean(data.substring(start, start+92))
        }
    }else{
        return  R34CleanLink()
    }
}

const deepClean = (data) => {
    let index = data.indexOf('"')
    if(index>0){
        return data.substring(0, index)
    }
    return data
}

module.exports = R34CleanLink
