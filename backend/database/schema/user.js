const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: mongoose.SchemaTypes.String, required: true },
  password: { type: mongoose.SchemaTypes.String },
  email: { type: mongoose.SchemaTypes.String, required: true },
  googleId: { type: mongoose.SchemaTypes.String },
  authType: { type: mongoose.SchemaTypes.String, required: true },
  profilePhoto: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "uploads.files",
    required: false,
  },
  rooms: {
    type: [String],
    required: false,
    default: []
  },
  createdAT: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    default: new Date(),
  },
  chatBotSummary: { type: [String] },
});
module.exports = mongoose.model("user", userSchema);
