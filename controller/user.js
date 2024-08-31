const { default: mongoose } = require("mongoose");
const User = require("../models/user");
const getUsers = async (req, res) => {
  const users = await User.find();
  return res.status(200).json(users);
};

const createUser = async (req, res) => {
  const body = req.body;
  console.log("body", body);
  if (!body || !body.firstName || !body.email) {
    return res.status(400).json({ msg: "All fields required....." });
  }
  const result = await User.create({
    ...body,
  });
  console.log("res", result);
  return res.status(201).json({ msg: "success", res: result });
};

const getUserById = async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  }
  return res.status(404).json({ error: "Id not valid" });
};

module.exports = { getUsers, createUser, getUserById };
