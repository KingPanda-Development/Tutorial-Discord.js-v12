const Discord = require('discord.js')
const client = new Discord.Client();

client.on('ready', () => {
	console.log('Tutorial bot discord is ready!!')
  client.user.setActivity(`Tutorial bot discord`)
});

client.on("message", message => {
  if(message.content === "!ping") {
  //i forget it lol
    return message.channel.send(`Pong ${client.ws.ping}`)
  }
});

client.login('PUT_YOUR_TOKEN_HERE');
