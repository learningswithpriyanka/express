const jwt = require("jsonwebtoken");
require("dotenv").config()

const verify = (req, res, next) => {
    // console.log(req.headers)
    const header = req.headers["authorization"];
    if (!header) res.sendStatus(401)
    console.log(header)
    // const token = header.split(" ")[1]
    jwt.verify(header, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) res.sendStatus(403);
        console.log(decoded)
         next();
    })
   
}

module.exports = verify;