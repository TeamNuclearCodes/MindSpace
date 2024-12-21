const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGOOSE_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));
