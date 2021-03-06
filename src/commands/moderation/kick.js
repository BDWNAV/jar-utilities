const Discord = require("discord.js");
const mongoose = require("mongoose");
const moderationSchema = require("../../models/moderationSchema");

module.exports.run = async (client, message, args) => {
  const member = message.mentions.members.first();
  const reason = args.slice(1).join(" ");

  if (!message.member.permissions.has("KICK_MEMBERS")) {
    return message.channel.send({
      content: "You do not have the sufficient permission to use this command.",
    });
  } else {
    if (!member) {
      return message.channel.send({ content: "There was no member provided." });
    } else {
      if (!reason) {
        return message.channel.send({
          content: "There was no reason provided to kick the member.",
        });
      } else {
        message.guild.members
          .kick(member.id, reason)
          .then(() => {
            const logs = message.client.channels.cache.get("865439604097941575");

            const newUserData = new moderationSchema({
              guildID: message.guild.id,
              userID: member.id,
              reason: reason,
              punishmentType: "Kick",
              moderator: message.author.id,
            });

            newUserData.save();

            const successEmbed = new Discord.MessageEmbed()
              .setTitle("Member kicked")
              .setDescription(`${member} was kicked from the guild.`)
              .addField("User", `<@${member.id}>`)
              .addField("Reason", reason)
              .addField("Punishment Type", "Kick")
              .addField("Moderator", `<@${message.author.id}>`)
              .addField("Case", "`" + newUserData._id + "`")
              .setFooter("Member kicked")
              .setTimestamp();
            message.channel.send({ embeds: [successEmbed] });
            logs.send({ embeds: [successEmbed] });

            const userMutedEmbed = new Discord.MessageEmbed()
              .setTitle("You were kicked")
              .setDescription(`You were kicked from ${message.guild.name}.`)
              .addField("Reason", reason)
              .addField("Punishment Type", "Kick")
              .addField("Moderator", `<@${message.author.id}>`)
              .addField("Dispute case", "To dispute this case please provide a moderator this id " + "`" + newUserData._id + "`");
            member.send({ embeds: [userMutedEmbed] });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }
};

module.exports.help = {
  name: "kick",
  description: "Kick a member from the guild.",
  aliases: ["k"],
  category: "moderation",
  usage: "<user> <reason>",
  minArgs: 5,
  maxArgs: 100,
};
