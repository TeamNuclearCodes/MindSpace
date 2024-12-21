const { Router } = require("express");
const { authRouter } = require("./unProtectedRoutes/auth");
const passport = require("passport");
const { verifyRouter } = require("./protectedRoutes/jwtVerify");
const { roomRouter } = require("./protectedRoutes/rooms");
const { messageRouter } = require("./protectedRoutes/message");

const router = Router();

router.use("/auth", authRouter);

router.use("/",(req,res,next) => {
  console.log(req.cookies)
  next()
})

router.use(
  "/",(req, res, next) => {
    console.log(req.cookies)
    next();
  },
  passport.authenticate("jwt", { session: false })
);

router.use("/room", roomRouter);
router.use("/message", messageRouter)
router.use("/", verifyRouter);

module.exports = { router };
