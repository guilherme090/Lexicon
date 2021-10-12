const axios = require('axios');

module.exports = async function(msg, args){
    let keywords = args.join(" ");
    let url = `https://g.tenor.com/v1/search?q=${keywords}&key=${process.env.TENOR_KEY}&limit=8`;
    let response = await axios.get(url);
    response = response.data; 
    let shuffledGif = Math.floor(Math.random() * response.results.length);
    msg.channel.send(response.results[shuffledGif].url);
    msg.channel.send('Via Tenor: ' + keywords);
}
