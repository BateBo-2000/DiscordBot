module.exports = async (url) => {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let data = await response.text();
        return data;
    } catch (error) {
        console.error("An error occurred while fetching data!");
    } 
}