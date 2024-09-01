const fs = require("fs")

function logger(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `${Date.now()} : ${req.url} ${req.method}\n`,
      (err, data) => {
        console.log(err);
      }
    );
    req.userdata = "priyanka"
    next();
  };
}

module.exports = { logger };
