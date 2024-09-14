const express = require("express");
const router = express();

const { refreshToken } = require("../controller/refresh");

router.get("/", refreshToken);

module.exports = router;
