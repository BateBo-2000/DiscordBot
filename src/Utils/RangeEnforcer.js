module.exports = (number, min, max) => {
    if(!number) number = 1
    if(number > max) number = max
    if(number < min) number = min
    return number
}