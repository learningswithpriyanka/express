const express = require("express");
const router = express();

const { registerUser } = require("../controller/register");

router.post("/", registerUser);

module.exports = router;
