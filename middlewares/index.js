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
    next();
  };
}

module.exports = { logger };
