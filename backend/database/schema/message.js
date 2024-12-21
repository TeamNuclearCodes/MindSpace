const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    message: {
      text: {
        type: String,
      },
    },
    group: String,
    sender: {
      type: mongoose.Schema.Types.String,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("message", messageSchema);