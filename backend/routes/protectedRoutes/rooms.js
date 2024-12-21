const { Router } = require("express");
const Room = require("../../database/schema/room");
const User = require("../../database/schema/user");
const room = require("../../database/schema/room");

const roomRouter = Router();

roomRouter.post("/create", async (req, res) => {
  const { room, user } = req.body;
  console.log(user);
  if (!room) {
    return res.status(400).json({error: "Enter Groupname"});
  } else {
    const groupDB = await Room.findOne({ group: room });
    if (groupDB) return res.status(400).json({error: "Group already exists"});
    try {
      const userDB = await User.findOne({ username: user });
      if (!userDB) {
        return res.status(404).json({error: "User not found"});
      }

      if (userDB.rooms.includes(room)) {
        return res.status(400).json({error: "Group already exists for this user"});
      }

      userDB.rooms.push(room);
      await userDB.save();

      const newRoom = new Room({ group: room });
      await newRoom.save();
      res.status(201).json(newRoom);
    } catch (error) {
      console.log(error);
      res.status(500).json({error: "Internal Server Error"});
    }
  }
});

roomRouter.post("/join", async (req, res) => {
  const { room, user } = req.body;
  if (!room) {
    return res.status(400).json({error: "Enter Groupname"});
  } else {
    const groupDB = await Room.findOne({ group: room });
    if (!groupDB) return res.status(400).json({error: "Group not found"});
    try {
      const userDB = await User.findOne({ username: user });
      console.log(userDB);
      if (!userDB) {
        return res.status(404).json({error: "User not found"});
      }

      if (userDB.rooms.includes(room)) {
        return res.status(400).json({error: "Group already exists for this user"});
      }

      userDB.rooms.push(room);
      console.log(userDB);
      await userDB.save();

      res.status(201).send(room);
    } catch (error) {
      console.log(error);
      res.status(500).json({error: "Internal Server Error"});
    }
  }
});

roomRouter.post("/list", async (req, res) => {
  try {
    const { username } = req.body;
    const userDB = await User.findOne({ username });
    res.status(200).send(userDB.rooms)
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = { roomRouter };
