const { Client, Collection, Intents } = require("discord.js");
const mongoose = require("mongoose");
const client = new Client({ intents: new Intents(32767) });

client.config = require("./config.js"); // Make all variables in the config.js file available through client.config
["commands", "aliases"].forEach((x) => (client[x] = new Collection())); // Create collections for the bot commands and their aliases

require("./handlers/command.js")(client); // require the handlers and provide the client variable
require("./handlers/event.js")(client);

mongoose.connect(client.config.database.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true 
}).then(() => console.log("Conected to the database")).catch((err) => console.log(err));

client.login(client.config.token);
