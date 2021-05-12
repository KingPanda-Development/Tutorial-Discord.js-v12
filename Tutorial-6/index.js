const { Client, Collection } = require('discord.js');
const keepAlive = require('./server.js');
const config = require('./config.json');

const client = new Client({
  disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();
client.config = config;

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

require("dotenv").config();

client.on('ready', () => {
  console.log('Tutorial Bot Discord Is Online');
  client.user.setActivity('Tutorial Bot Discord For Youtube');
});


client.on("message", async message => {
  if(message.author.bot) return;
  if(!message.guild) return;
  if(!message.content.startsWith(config.prefix)) return;
  
  if(!message.member) message.member = await message.guild.fetchMember(message);
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  
  if(cmd.length === 0) return;
  
  let command = client.commands.get(cmd);
  if(!command) command = client.commands.get(client.aliases.get(cmd));
  
  if(command) 
    command.run(client, message, args);
});

keepAlive()
client.login(config.token);
