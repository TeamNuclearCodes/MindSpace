const express = require("express");
const app = express();
require("dotenv").config();
require("./database");
const passport = require("./passport-config");
const { router } = require("./routes/routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io")
const http = require("http");

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

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log('User connected')
  socket.on("join", (room) => socket.join(room));
  socket.on("send-message", (message, grp, sender) => {
    console.log(message,grp,sender);
    socket
      .to(grp)
      .emit("receive-message", { content: message, sender: sender });
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
