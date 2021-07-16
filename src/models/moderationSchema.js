const mongoose = require("mongoose");

const moderationSchema = new mongoose.Schema({
  guildID: { type: String, required: true },
  userID: { type: String, required: true },
  reason: { type: String, required: true },
  punishmentType: { type: String, required: true },
  moderator: { type: String, required: true }
});

const moderationModel = module.exports = mongoose.model("guild-moderation", moderationSchema);