/**
 * @param {String} data 
 * @param {String} searchTerm 
 * @returns 
 */

const FindLink = (data, searchTerm)=>{
    let links = []
    while(data.indexOf(searchTerm)>0){
        data = data.substring(data.indexOf(searchTerm))
        let CleanedLink = CleanLink(data.substring(0, 92))
        if(noMp4(CleanedLink)){
            links = pushUnique(links, CleanedLink);  
        } 
        data = data.substring(92)
    } 
    return links
}

const CleanLink = (text) => {
    if(text.includes('"')){
        let end = text.indexOf(`"`)
        return text.substring(0, end)
    }
    return text
}

function pushUnique(arr, link) {
    if (!arr.includes(link)) {
      arr.push(link);
    }
    return arr
}

function noMp4(link) {
    if(link.endsWith('.mp4')){
        return false
    }
    return true
}
module.exports = {FindLink}