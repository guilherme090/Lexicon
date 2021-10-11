

const greetings = require("./commands/greetings");
const gif = require("./commands/gif");
const deletemsg = require("./commands/delete_msg");
const lookup = require("./commands/lookup");
const PREFIX = '!';

commands = {
    greetings,
    gif,
    deletemsg,
    lookup
};

module.exports = async function (msg){
    try{
        if(msg.author.bot) return;
    
        console.log('Message received: ' + msg.content);
    
        let tokens = msg.content.split(/ +/);
        // console.log('Tokens: ' + tokens);
        let command = tokens.shift();
        // console.log('Command: ' + command);
        if(command.charAt(0) === PREFIX){
            // console.log('Got a valid command: ' + command.substring(1));
            command = command.substring(1);
            commands[command](msg, tokens);
        }
    }catch(error){
        console.log('got an error: ' + error);
        msg.channel.send('Comando não encontrado.');
    }
       
}