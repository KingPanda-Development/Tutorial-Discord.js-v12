const discord = require('discord.js');

module.exports = {
  name: "ping", 
  description: "Check your ping",
  category: "general",
  usage: "ping",
  aliases: ["p"],
  run: async(client, message, args) => {
    
    return message.channel.send(`Your ping is \`${client.ws.ping}\``);
    
  }
}
