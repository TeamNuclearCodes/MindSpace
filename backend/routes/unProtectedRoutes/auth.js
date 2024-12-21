const { Router } = require("express");
const User = require("../../database/schema/user");
const passport = require("passport");
const { hashPass, compareHash, generateToken } = require("../../util/helpers");

const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const UserDB = await User.findOne({ $or: [{ username }, { email }] });
    if (UserDB) {
      res.status(400).send("user exists");
    } else {
      const hash = await hashPass(password);
      const user = new User({
        email,
        password: hash,
        username,
        authType: "local",
      });
      user.save();
      const jwt = generateToken(user);
      res
        .setHeader("Set-Cookie", [
          `token=${jwt}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict; Secure`,
          `authorized=true; Path=/; Max-Age=3600; SameSite=Strict; Secure`,
        ])
        .sendStatus(201);
    }
  } catch (err) {
    console.log(req.body);
    console.log(err);
  }
});

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    console.log(12);
    const user = req.user;

    const token = generateToken(
      { sub: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.cookie("jwt", token, { httpOnly: true, secure: false });
    res.redirect("/dashboard");
  },
);

authRouter.post("/login", async (req, res) => {
  try {
    const { password, username } = req.body;
    const UserDB = await User.findOne({ username });
    if (!UserDB) {
      res.status(404).send("user not found");
    } else {
      if (await compareHash(password, UserDB.password)) {
        const jwt = generateToken(UserDB);
        res
          .setHeader("Set-Cookie", [
            `token=${jwt}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict; Secure`,
            `authorized=true; Path=/; Max-Age=3600; SameSite=Strict; Secure`,
          ])
          .status(200)
          .send(UserDB);
      } else {
        res.status(401).send("Credentials dont match");
      }
    }
  } catch (err) {
    console.log(req.body);
    console.log(err);
  }
});

module.exports = { authRouter };
