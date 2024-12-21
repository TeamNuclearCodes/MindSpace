const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = new Schema({
  group: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("group", roomSchema);