const fetch = require('node-fetch');

module.exports = async function(msg, args){
    let keywords = args.join(" ");
    let url = `https://g.tenor.com/v1/search?q=${keywords}&key=${process.env.TENOR_KEY}&limit=8`;
    let response = await fetch(url);
    let json = await response.json();
    let shuffledGif = Math.floor(Math.random() * json.results.length);
    msg.channel.send(json.results[shuffledGif].url);
    msg.channel.send('Via Tenor: ' + keywords);
}
