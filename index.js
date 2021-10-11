console.log('Initializing...');

require("dotenv").config();
const Discord = require('discord.js');

const client = new Discord.Client();
const botToken = process.env.BOT_TOKEN;
client.login(botToken);

client.on('ready', readyDiscord);

function readyDiscord(){
    console.log('Ready to go!');
} 

const commandHandler = require("./command_handler");
client.on('message', commandHandler);