const Discord = require('discord.js');
const client = new Discord.Client();
const env = require('node-env-file');

// Import the secret values (e.g. private discord key) from .env
env(__dirname + '/.env')

client.login(process.env.KEY);
