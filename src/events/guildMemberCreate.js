const Discord = require("discord.js");

module.exports = async (guild) => {
  const channelId = message.guild.channels.cache.get("863373439019384832");

  const welcomeEmbed = new Discord.MessageEmbed()
    .setTitle("Welcome")
    .setAuthor(
      guild.member.displayAvatarURL({
        format: "png",
        dynamic: true,
        size: 1024,
      })
    )
    .setDescription(`Welcome ${guild.member}!`)
    .setColor("BLUE");
  channelId.send(welcomeEmbed);
};
