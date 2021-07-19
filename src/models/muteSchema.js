const mongoose = require("mongoose");

const muteSchema = new mongoose.Schema({
  guildID: { type: String, required: true },
  userID: { type: String, required: true, unique: true },
  roles: { type: Array, required: true }
});

const muteModel = module.exports = mongoose.model("guild-mute-roles", muteSchema);