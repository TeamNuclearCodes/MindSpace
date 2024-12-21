const { Router } = require("express");

const verifyRouter = Router();

verifyRouter.get("/", (req, res) => {
  res.json(req.user)
});

module.exports = { verifyRouter };
