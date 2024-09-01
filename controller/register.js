const fs = require("fs").promises;
const path = require("node:path");
const bcrypt = require("bcrypt");

const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const registerUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res.status(400).json({ message: "Details missing" });

    const userFound = usersDB.users.find((person) => {
        return person.name === user
    });
    console.log("userFound",userFound)
  if (userFound) return res.sendStatus(409);

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const newUser = { name: user, pwd: hashedPwd };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fs.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(usersDB.users)
    );
    return res.status(201).json({ success: "User created" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};

module.exports = { registerUser };
