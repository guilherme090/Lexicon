const fetch = require('node-fetch');

function capitalize(lowercaseWord){
    let firstChar = lowercaseWord.charAt(0).toUpperCase();
    return (firstChar + lowercaseWord.slice(1));
}

module.exports = async function(msg, args){
    let keywords = args.join(" ");
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${keywords}`;
    let response = await fetch(url);
    let json = await response.json();
    console.log(json);


    try{
        if(json.title != undefined){
            if(json.title.toUpperCase() === 'NO DEFINITIONS FOUND'){
                msg.channel.send({embed: {
                    color: '#FF0000',
                    title: `Sorry! I could not find the word "${keywords}". Maybe you could try looking it up on the Web.`,
                    fields: [
                        { name: `The Free Dictionary - by Farlex`, value: `https://www.thefreedictionary.com/${keywords}`, inline: true},
                        { name: `Dictionary.com`, value: `https://www.dictionary.com/browse/${keywords}`, inline: true},
                        { name: `Cambridge Dictionary`, value: `https://dictionary.cambridge.org/dictionary/english/${keywords}`, inline: true}
                    ]
                  }
                });
                return;
            }
        }   
    }catch(err){
        console.log('mistake after not finding the requested word.')
    }
    json.forEach((word, wordIndex) => {
        let phonetics = [];
        let meanings = [];
        json[wordIndex].phonetics.forEach((element, index) => {
            phonetics.push({ name: `Pronunciation ${index + 1}`, value: `${element.text}\n${element.audio}`, inline: true});
        });
        json[wordIndex].meanings.forEach((element, index) => {
            meanings.push({ name: `\u200B`, value: `\u200B`, inline: false});
            if(element.partOfSpeech != ''){
                meanings.push({ name: `Part of Speech`, value: `${element.partOfSpeech}`, inline: false});
            }
            element.definitions.forEach(definition => {
                for(const [key, value] of Object.entries(definition)){
                    if(value != ''){
                        meanings.push({ name: capitalize(key), value: `${value}`, inline: false});
                    }  
                } 
            })
        });

        msg.channel.send({embed: {
            color: '#009900',
            title: `${json[wordIndex].word}`,
            fields: [
              phonetics,
              meanings,
              { name: `\u200B`, value: `\u200B`, inline: false}
            ],
            footer: {
                text: 'By dictionaryapi.dev'
            } 
          }
        });
    });
}
