const Discord = require("discord.js");
const moderationSchema = require("../../models/moderationSchema");

module.exports.run = async (client, message, args) => {
  const member = message.mentions.members.first();
  const reason = args.slice(1).join(" ");

  if (!message.member.hasPermission("KICK_MEMBERS")) {
    return message.channel.send(
      "You do not have sufficient permission to use this command."
    );
  } else {
    if (!member) {
      return message.channel.send("There was no member provided to warn.");
    } else {
      if (!reason) {
        return message.channel.send(
          "There was no reason provided to warn the member."
        );
      } else {
        const logs = message.guild.channels.cache.get("865439604097941575");

        let newUserData = new moderationSchema({
          guildID: message.guild.id,
          userID: member.id,
          reason: reason,
          punishmentType: "Warn",
          moderator: message.author.id,
        });

        newUserData.save();

        const successEmbed = new Discord.MessageEmbed()
          .setTitle("Member kicked")
          .setDescription(`${member} was Warned.`)
          .addField("User", member)
          .addField("Reason", reason)
          .addField("Punishment Type", "Warn")
          .addField("Moderator", `<@${message.author.id}>`)
          .addField("Case", "`" + newUserData._id + "`")
          .setFooter("Member warned ")
          .setTimestamp();
        message.channel.send(successEmbed);
        logs.send(successEmbed);
      }
    }
  }
};

module.exports.help = {
  name: "warn",
  description: "Warn a member.",
  aliases: ["W"],
  category: "moderation",
  usage: "<user> <reason>",
  minArgs: 10,
  maxArgs: 100,
};
