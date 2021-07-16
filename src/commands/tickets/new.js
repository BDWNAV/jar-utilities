const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  const reason = args.join(" ");

  if (!reason) {
    return message.channel.send("Please provide a reason to open the ticket.");
  } else {
    const ticketChannel = await message.guild.channels
      .create(`ticket-${message.author.username}`, {
        type: "text",
        permissionOverwrites: [
          {
            id: message.guild.id,
            deny: ["VIEW_CHANNEL", "SEND_MESSAGES"],
          },
          {
            id: message.author.id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
          },
        ],
      })
      .then((Tchannel) => {
        Tchannel.send(
          `Thank you for opening a ticket, in the mean while please elaborate why you created the ticket. Reason: ${reason}`
        );
        message.channel.send(`Your ticket is in ${Tchannel}.`);
      })
      .catch((err) => console.log(err));
  }
};

module.exports.help = {
  name: "new",
  description: "Make a new ticket to get support.",
  aliases: ["n"],
  category: "tickets",
  usage: "<reason>",
  minArgs: 5,
  maxArgs: 100,
};
