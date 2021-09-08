const Discord = require("discord.js");
const ms = require("ms");
const moderationSchema = require("../../models/moderationSchema");

module.exports.run = async (client, message, args) => {
  const member = message.mentions.members.first();
  const time = args[1];
  const reason = args.slice(2).join(" ");

  if (!message.member.permissions.has("KICK_MEMBERS")) {
    return message.channel.send({
      content: "You do not have sufficient permission to use this command.",
    });
  } else {
    if (!member) {
      return message.channel.send({
        content: "There was no member provided to mute.",
      });
    } else {
      if (!time) {
        return message.channel.send({
          content: "There was no amount of time provided to mute the member.",
        });
      } else {
        if (time.endsWith("y")) {
          return message.channel.send({
            content:
              "The time that you have provided to mute the user is to long.",
          });
        } else {
          if (isNaN(ms(time))) {
            return message.channel.send({
              content: "The value you have provided is not a number.",
            });
          } else {
            if (!reason) {
              return message.channel.send({
                content: "There was no reason provided to mute the member.",
              });
            } else {
              const logs =
                message.client.channels.cache.get("865439604097941575");

              const getRoles = member.roles.cache.map((role) => {
                return role.id;
              });

              const filter = getRoles.filter(
                (role) => role !== "850166096950067210"
              );

              member.roles
                .remove(filter)
                .then(() => {
                  member.roles.add("863376286135484427");
                })
                .catch((err) => {
                  console.log(err);
                });

              const newUserData = new moderationSchema({
                guildID: message.guild.id,
                userID: member.id,
                reason: reason,
                punishmentType: "Mute",
                moderator: message.author.id,
              });

              newUserData.save();

              const mutedEmbed = new Discord.MessageEmbed()
                .setTitle("Member muted")
                .setDescription(`${member} was muted.`)
                .addField("User", `<@${member.id}>`)
                .addField("Punishment Type", "Mute")
                .addField("Moderator", `<@${message.author.id}>`)
                .addField("Case", "`" + newUserData._id + "`")
                .setFooter("Member muted")
                .setTimestamp();
              message.channel.send({ embeds: [mutedEmbed] });
              logs.send({ embeds: [mutedEmbed] });

              const userMutedEmbed = new Discord.MessageEmbed()
                .setTitle("You were muted")
                .setDescription(`You were muted in ${message.guild.name}.`)
                .addField("Reason", reason)
                .addField("Punishment Type", "Mute")
                .addField("Moderator", `<@${message.author.id}>`)
                .addField("Dispute case", "To dispute this case please provide a moderator this id " + "`" + newUserData._id + "`");
              member.send({ embeds: [userMutedEmbed] });

              setTimeout(async function () {
                member.roles.remove("863376286135484427").then(async () => {
                  await member.roles.add(filter);
                });

                const unmutedEmbed = new Discord.MessageEmbed()
                  .setTitle("Member unmuted")
                  .setDescription(`${member} was unmuted.`)
                  .addField("User", `<@${member.id}>`)
                  .addField("Punishment Type", "Mute")
                  .addField("Moderator", `<@${message.author.id}>`)
                  .addField("Case", "`" + newUserData._id + "`")
                  .setFooter("Member unmuted")
                  .setTimestamp()
                logs.send({ embeds: [unmutedEmbed] });
              }, ms(time));
            }
          }
        }
      }
    }
  }
};

module.exports.help = {
  name: "mute",
  description: "Mute a member in the guild.",
  aliases: ["m"],
  category: "moderation",
  usage: "<user> <time> <reason>",
  minArgs: 6,
  maxArgs: 101,
};
