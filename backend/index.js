const express = require("express");
const app = express();
require("dotenv").config();
require("./database");
const passport = require("./passport-config");
const { router } = require("./routes/routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Server all good").status(200);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
