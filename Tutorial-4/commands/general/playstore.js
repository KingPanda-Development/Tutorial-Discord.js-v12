const discord = require('discord.js')
const play = require('google-play-scraper')

module.exports = {
  name: "playstore",
  category: "general",
  usage: "playstore <app name>",
  aliases: ["app", 'playstore', "ps"],
  description: "Get info about application on playstore",
  run: async(client, message, args) => {
   
    let kata = args.join(' ')
    if (!kata) return message.channel.send(`What's The Name Of Application Will You Search ??`)
    
   play.search({term:kata,num:1})
   .then(data => {
    
   let app = data[0].appId
   play.app({appId:app})
   .then(lata => {
   let price = lata.price === 0 ? "Free" : `${lata.price}`
   
   let embed = new discord.MessageEmbed()
   .setColor('RANDOM')
   .setTitle(lata.title)
   .setThumbnail(lata.icon)
   .setDescription(lata.summary)
   .addField('Developer', lata.developer, true)
   .addField('Price', price, true)
   .addField('Ratings', lata.scoreText, true)
   .addField('Installs', lata.installs === undefined ? "None" : lata.installs, true)
   .addField('Genre', lata.genre === undefined ? "None" : lata.genre, true)
   .addField('Released Date', lata.released === undefined ? "None" : lata.released, true)
   .addField('Application Link', `[App Link](${lata.url})`, true)
   .addField('Comment', lata.comments[0] === undefined ? "None" : lata.comments[0], true)
   .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true}))
   .setTimestamp()
   return message.channel.send(embed)
     })
   })
  }
}
