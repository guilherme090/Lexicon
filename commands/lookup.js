const axios = require('axios');
const { MessageEmbed } = require('discord.js');

function capitalize(lowercaseWord){
    let firstChar = lowercaseWord.charAt(0).toUpperCase();
    return (firstChar + lowercaseWord.slice(1));
}

module.exports = async function(msg, args){
    let keywords = args.join(" ");
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${keywords}`;
    try{
        let response = await axios.get(url);
        response = response.data; 

        console.log(response);

        if(response.title === 'No Definitions Found'){
            msg.channel.send('I could not find the requested word.');
            return;
        } 

        const wordEmbed = new MessageEmbed()
            .setTitle(response[0].word)
            .setTimestamp()
            .setFooter('By Dictionary API', 'https://dictionaryapi.dev');

        response.forEach((word, wordIndex) => {
            response[wordIndex].phonetics.forEach((element, index) => {
                wordEmbed.addField(`Pronunciation ${index + 1}`, `${element.text}\n${element.audio}`, true);
            });
            response[wordIndex].meanings.forEach((element, index) => {
                wordEmbed.addField(`\u200B`, `\u200B`, false);
                if(element.partOfSpeech != ''){
                    wordEmbed.addField(`Part of Speech`, `${element.partOfSpeech}`, false);
                }
                element.definitions.forEach(definition => {
                    for(let [key, value] of Object.entries(definition)){
                        if(typeof(value) === "object"){
                            value = value.join();
                        }
                        if(typeof(value) === "string" && value !== ''){
                            wordEmbed.addField(capitalize(key),`${value}`, false);
                        }
                    } 
                })
        });

        msg.channel.send({ embeds: [wordEmbed] });

    });          
    }catch(err){
        msg.channel.send(`I'm deeply sorry! I couldn't find the word you are looking for.`);
    }

}
