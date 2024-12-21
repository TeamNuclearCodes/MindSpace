const { Router } = require("express");
const Message = require("../../database/schema/message");

const messageRouter = Router();

messageRouter.post("/addMsg", async (req, res) => {
  const { msg, grp, from } = req.body;
  const data = await Message.create({
    message: { text: msg },
    group: grp,
    sender: from,
  });
});

messageRouter.post("/readMsg", async (req, res) => {
  try {
    const { grp } = req.body;
    const messages = await Message.find({ group: { $all: grp } }).sort({
      updatedAt: 1,
    });
    const projectedMsg = messages.map((msg) => {
      return {
        sender: msg.sender,
        content: msg.message.text,
      };
    });
    res.send(projectedMsg);
  } catch (err) {
    console.log(err);
  }
});

messageRouter.post("/readAiMsg", async (req, res) => {
  try {
    const { grp } = req.body;
    const messages = await Message.find({ group: { $all: grp } }).sort({
      updatedAt: 1,
    });
    const projectedMsg = messages.map((msg) => {
      return {
        sender: msg.sender,
        content: msg.message.text,
      };
    });
    res.send(projectedMsg);
  } catch (err) {
    console.log(err);
  }
});

module.exports = { messageRouter };
