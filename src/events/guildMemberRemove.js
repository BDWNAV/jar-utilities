const Discord = require("discord.js");

/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.GuildMember} member 
 */

module.exports = async (client, member) => {
  const leaveChannel = member.client.channels.cache.get("863373439019384832");

  const memberLeft = new Discord.MessageEmbed()
  .setTitle("Bye :sob:")
  .setDescription(`${member.user.username} has left us good bye we hope you join us again soon :sob:.`)
  .addField("User Id", "`" + member.id + "`")
  .setImage(member.user.displayAvatarURL({ dynamic: true }))
  .setColor("#FF0000")
  leaveChannel.send({ embeds: [memberLeft] });
}