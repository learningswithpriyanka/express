const fs = require("fs").promises;
const path = require("node:path");
const bcrypt = require("bcrypt");

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
          return res.status(200).json({ success: "User loggedIn" });
      } else {
          return res.sendStatus(401)
      }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};

module.exports = { loginUser };
