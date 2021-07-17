const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (!message.channel.name.startsWith("ticket-")) {
    return message.reply("This is not a ticket channel.");
  } else {
    message.channel.delete();
  }
};

module.exports.help = {
  name: "close",
  description: "Close a ticket to get support.",
  aliases: ["c"],
  category: "tickets",
  usage: "",
  minArgs: 0,
  maxArgs: 0,
};