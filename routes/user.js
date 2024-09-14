const express = require("express");
const router = express();
const verify = require("../middlewares/verify");
const { getUsers, createUser, getUserById } = require("../controller/user");

router.route("/").get(verify, getUsers).post(createUser);

router.get("/:id", getUserById);

module.exports = router;
