const fs = require("node:fs")

const readableStream = fs.createReadStream("./file.txt", {
    encoding: "utf-8",
    highWaterMark:2
})

const writeableStream = fs.createWriteStream("./file2.txt")

// readableStream.pipe(writeableStream)
readableStream.on("data", chunk => {
    console.log(chunk)
    writeableStream.write(chunk)
})
readableStream.on("end", () => {
    console.log("Finished")
})