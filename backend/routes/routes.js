const { Router } = require("express");
const { authRouter } = require("./unProtectedRoutes/auth");
const passport = require("passport");
const { verifyRouter } = require("./protectedRoutes/jwtVerify");

const router = Router();

router.use("/auth", authRouter);

router.use(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    next();
  },
);

router.use("/", verifyRouter);

module.exports = { router };
