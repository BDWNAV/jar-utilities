const Discord = require("discord.js");

/**
 * 
 * @param {Discord.GuildMember} member 
 * @param {Discord.Client} client 
 */

module.exports = async (client, member) => {
  const welcomeChannel = member.client.channels.cache.get("863373439019384832");

  const welcomeEmbed = new Discord.MessageEmbed()
  .setTitle("Welcome!")
  .setDescription(`Everyone welcome ${member.user.username}, to ${member.guild.name}! We hope you enjoy your stay!`)
  .addField("User Id", `${member.id}`)
  .setImage(member.user.displayAvatarURL({ dynamic: true }))
  .setColor("#00FF00")
  welcomeChannel.send({ embeds: [welcomeEmbed] }); 
}