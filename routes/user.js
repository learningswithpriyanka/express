const express = require("express");
const router = express();

const {getUsers, createUser, getUserById} = require("../controller/user")

router
  .route("/")
  .get(getUsers)
  .post(createUser);

router.get("/:id", getUserById);

module.exports = router;
