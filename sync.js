const Discord = require('discord.js');
const client = new Discord.Client();
const env = require('node-env-file');

// Import the secret values (e.g. private discord key) from .env
env(__dirname + '/.env')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('presenceUpdate', (oldMember, newMember) => {
  console.log('oldPresence:', oldMember.presence.status);
  console.log('newPresence:', newMember.presence.status);
  console.log('oldMember:', oldMember);
  console.log('newMember:', newMember);
  debugger;
});

client.login(process.env.KEY);
