const Discord = require("discord.js");

/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Invite} invite 
 */

module.exports = (client, invite) => {
  const leaveChannel = invite.client.channels.cache.get("863373439019384832");

  const inviteCreatedEmbed = new Discord.MessageEmbed()
  .setTitle("Invite created")
  .setDescription(`A invite was created by ${invite.inviter}.`)
  .addField("User Id", `${invite.inviter.id}`)
  .addField("Url", invite.url)
  .addField("Deletable", invite.deletable)
  leaveChannel.send({ embeds: [inviteCreatedEmbed] });
}