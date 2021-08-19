const Discord = require("discord.js");
const moderationSchema = require("../../models/moderationSchema");

module.exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) {
    return message.channel.send({
      content: "You do not have the sufficient permission to use this command.",
    });
  } else {
    let data = await moderationSchema.findOne({
      _id: args[0],
    });

    if (data) {
      const dataEmbed = new Discord.MessageEmbed()
        .setTitle("Case data")
        .setDescription(`Data for <@${data.userID}>`)
        .addField("User", `<@${data.userID}>`)
        .addField("Reason", data.reason)
        .addField("Punishment Type", data.punishmentType)
        .addField("Moderator", `<@${data.moderator}>`)
        .addField("Case", "`" + args[0] + "`")
        .setTimestamp();
      message.channel.send({ embeds: [dataEmbed] });
    } else {
      return message.channel.send({ content: "No data for that case." });
    }
  }
};

module.exports.help = {
  name: "getcase",
  description: "Get a case.",
  aliases: ["gc"],
  category: "moderation",
  usage: "<caseNumber>",
  minArgs: 1,
  maxArgs: 1,
};
