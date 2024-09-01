const express = require("express");
const router = express();

const { loginUser } = require("../controller/auth");

router.post("/", loginUser);

module.exports = router;
