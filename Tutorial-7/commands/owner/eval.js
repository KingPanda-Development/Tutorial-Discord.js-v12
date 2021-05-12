const discord = require("discord.js");
const config = require('../../config.json');
const { post } = require("node-superfetch");

module.exports = {
  name: "eval",
  category: "owner",
  description: "Evaluate some code!!",
  aliases: ["ev"],
  usage: "eval <code>",
run: async (client, message, args) => {

  if (!config.ownerID.some(m => message.author.id.includes(m))) {
    return message.reply("Sorry you can't use this command, This command only for owner of bot!!");
  }

  const embed = new discord.MessageEmbed()
  .addField("Your Code", "```js\n" + args.join(" ") + "```")   
  
  try {
      const code = args.join(" ");

      if (!code) {
        return message.reply("!eval <Code>");
      }

      let evaled;.
      if (code.includes(`SECRET`) || code.includes(`TOKEN`) || code.includes("process.env")) {
        evaled = "No, shut up, what will you do it with the token?";
      } else {
        evaled = eval(code);
      }

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled, {
        depth: 0
      });

      let result = clean(evaled);
      if (result.length > 1024) {
        const { body } = await post("https://hastebin.com/documents").send(result);
        embed.addField("Result", `https://hastebin.com/${body.key}.js`).setColor("RANDOM");
      } else {
        embed.addField("Result", "```js\n" + result + "```").setColor("RANDOM");
      }
     return message.channel.send(embed);
  } catch (error) {
      let err = clean(error);
      if (err.length > 1024) {
        const { body } = await post("https://hastebin.com/documents").send(err);
        embed.addField("Result", `https://hastebin.com/${body.key}.js`).setColor("RANDOM");
      } else {
        embed.addField("Result", "```js\n" + err + "```").setColor("RANDOM");
      }
     return message.channel.send(embed);
  }

  function clean(string) {
    if (typeof text === "string") {
      return string.replace(/`/g, "`" + String.fromCharCode(8203))
                   .replace(/@/g, "@" + String.fromCharCode(8203))
    } else {
      return string;
    }
  }
 
  
  
 }
}
