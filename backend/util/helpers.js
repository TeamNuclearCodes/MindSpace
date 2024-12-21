const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  const SECRET_KEY = process.env.JWT_SECRET;
  const payload = {
    sub: user.id,
    username: user.username,
  };
  return jwt.sign(payload, SECRET_KEY);
};

const hashPass = async (pass) => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(pass, salt);
};

const compareHash = (pass, hash) => {
  return bcrypt.compare(pass, hash);
};

module.exports = {
  hashPass,
  compareHash,
  generateToken,
};
