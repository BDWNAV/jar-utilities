const Discord = require("discord.js");

/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} oldMessage 
 * @param {Discord.Message} newMessage 
 */

module.exports = async (client, oldMessage, newMessage) => {
  const logChannel = newMessage.client.channels.cache.get("865439604097941575");

  const messageUpdatedEmbed = new Discord.MessageEmbed()
  .setTitle("Message updated") 
  .setDescription(`A message was updated by ${newMessage.author.username}.`)
  .addField("User Id", newMessage.author.id.toString())
  .addField("Channel", `${oldMessage.channel}`) 
  .addField("Old message content", `${oldMessage.content ? oldMessage.content : "error getting content!"}`)
  .addField("New message content", `${newMessage.content ? newMessage.content : "error getting content!"}`)
  .setThumbnail(oldMessage.author.displayAvatarURL({ dynamic: true }))
  logChannel.send({ embeds: [messageUpdatedEmbed] });
}