const Discord = require("discord.js");

/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 */

module.exports = async (client, message) => {
  const logChannel = message.client.channels.cache.get("865439604097941575");

  const messageDeletedEmbed = new Discord.MessageEmbed()
  .setTitle("Deleted message")
  .setDescription(`A message by ${message.author.username} was deleted.`)
  .addField("User Id", `${message.author.id}`)
  .addField("Content", `${message.content ? message.content : "error getting content!"}`)
  .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
  .setColor("#FF0000")
  logChannel.send({ embeds: [messageDeletedEmbed] });
}