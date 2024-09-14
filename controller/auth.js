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

const loginUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res.status(400).json({ message: "Details missing" });

  const userFound = usersDB.users.find((person) => {
    return person.name.toLowerCase() === user.toLowerCase();
  });
  console.log("userFound", userFound);
  if (!userFound) return res.sendStatus(401);

  try {
    const matchedPwd = await bcrypt.compare(pwd, userFound.pwd);
    if (matchedPwd) {
      const accessToken = jwt.sign(
        { username: userFound.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "60s" }
      );
      const refreshToken = jwt.sign(
        { username: userFound.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      const remainingUsers = usersDB.users.filter(
        (person) => person.username !== userFound.username
      );
      usersDB.setUsers([...remainingUsers, { ...userFound, refreshToken }]);
      await fs.writeFile(
        path.join(__dirname, "..", "models", "users.json"),
        JSON.stringify(usersDB.users)
      );
      res.cookie("token", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ accessToken });
    } else {
      return res.sendStatus(401);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};

module.exports = { loginUser };
