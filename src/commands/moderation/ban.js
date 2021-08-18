const Discord = require("discord.js");
const moderationSchema = require("../../models/moderationSchema");

module.exports.run = async (client, message, args) => {
  const member = message.mentions.members.first();
  const reason = args.slice(1).join(" ");

  if (!message.member.permissions.has("BAN_MEMBERS")) {
    return message.channel.send({
      content: "You do not have the sufficient permission to use this command.",
    });
  } else {
    if (!member) {
      return message.channel.send({ content: "There was no member provided." });
    } else {
      if (!reason) {
        return message.channel.send({
          content: "There was no reason provided to ban the member.",
        });
      } else {
        message.guild.members
          .ban(member.id, { reason: reason })
          .then(() => {
            const logs = message.guild.channels.cache.get("865439604097941575");

            const newUserData = new moderationSchema({
              guildID: message.guild.id,
              userID: member.id,
              reason: reason,
              punishmentType: "Ban",
              moderator: message.author.id,
            });

            newUserData.save();

            const successEmbed = new Discord.MessageEmbed()
              .setTitle("Member kicked")
              .setDescription(`${member} was Banned from the guild.`)
              .addField("User", `<@${member.id}>`)
              .addField("Reason", reason)
              .addField("Punishment Type", "Ban")
              .addField("Moderator", `<@${message.author.id}>`)
              .addField("Case", "`" + newUserData._id + "`")
              .setFooter("Member kicked")
              .setTimestamp();
            message.channel.send({ embeds: [successEmbed] });
            logs.send({ emebds: [successEmbed] });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }
};

module.exports.help = {
  name: "ban",
  description: "Ban a member from the guild.",
  aliases: ["B"],
  category: "moderation",
  usage: "<user> <reason>",
  minArgs: 10,
  maxArgs: 100,
};
