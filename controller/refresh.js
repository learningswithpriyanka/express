const fs = require("fs").promises;
const path = require("node:path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const refreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.token) res.sendStatus(401);
  const refreshToken = cookies.token;
  console.log("users", usersDB.users);
  const userFound = usersDB.users.find((person) => {
    return person.refreshToken === refreshToken;
  });
  console.log("userFound", userFound);
  if (!userFound) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    console.log("decoded", decoded);
    if (err || userFound.username !== decoded.username) res.sendStatus(403);
    const accessToken = jwt.sign(
      { username: userFound.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  });
};

module.exports = { refreshToken };
