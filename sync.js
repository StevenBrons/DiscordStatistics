require('./lib/env');

const Discord = require('discord.js');
const Database = require('./lib/Database');

const client = new Discord.Client();
const database = new Database();

const databaseConf = {
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
};

async function main() {
  await database.connect(databaseConf);

  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on('presenceUpdate', (oldMember, newMember) => {
    console.log('newMember:', newMember);
    database.addPresence(newMember);
  });

  client.on('guildMemberUpdate', (oldMember, newMember) => {
    console.log('guildMemberUpdate', newMember);
    database.setGuildMember(newMember);
  });

  client.on('guildMemberUpdate', (oldMember, newMember) => {
    console.log('guildMemberUpdate', newMember);
    database.setGuildMember(newMember);
  });

  client.on('guildUpdate', (oldGuild, newGuild) => {
    console.log('guildUpdate', newGuild);
    database.setGuild(newGuild);
  });

  client.login(process.env.DISCORD_KEY);
}

main();
