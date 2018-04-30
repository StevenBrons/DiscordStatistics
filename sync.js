require('./lib/env');

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('presenceUpdate', (oldMember, newMember) => {
  console.log('oldPresence:', oldMember.presence.status);
  console.log('newPresence:', newMember.presence.status);
  console.log('oldMember:', oldMember);
  console.log('newMember:', newMember);
});

client.login(process.env.DISCORD_KEY);
