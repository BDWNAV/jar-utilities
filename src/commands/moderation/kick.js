const Discord = require("discord.js");
const mongoose = require("mongoose");
const moderationSchema = require("../../models/moderationSchema");

module.exports.run = async (client, message, args) => {
  const member = message.mentions.members.first();
  const reason = args.slice(1).join(" ");

  if(!message.member.hasPermission("KICK_MEMBERS")) {
    return message.channel.send("You do not have the sufficient permission to use this command.");
  } else {
    if(!member) {
      return message.channel.send("There was no member provided."); 
    } else {
      if(!reason) {
        return message.channel.send("There was no reason provided to warn the member.");
      } else {
        member.kick({ reason: reason }).then(() => {
          const logs = message.guild.channels.cache.get("865439604097941575");

          const newUserData = new moderationSchema({
            guildID: message.guild.id,
            userID: member.id,
            reason: reason,
            punishmentType: 'Kick',
            moderator: message.author.id,
          });
  
          newUserData.save();
  
          const successEmbed = new Discord.MessageEmbed()
          .setTitle("Member kicked")
          .setDescription(`${member} was kicked from the guild.`)
          .addField("User", member)
          .addField("Reason", reason)
          .addField("Punishment Type", "Kick")
          .addField("Moderator", `<@${message.author.id}>`)
          .addField("Case", "`" + newUserData._id + "`")
          .setFooter("Member kicked")
          .setTimestamp()
          message.channel.send(successEmbed);
          logs.send(successEmbed);
        }).catch((err) => {
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
  minArgs: 10,
  maxArgs: 100
}