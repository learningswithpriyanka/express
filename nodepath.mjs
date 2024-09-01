// const path = require("path")
import add from "./sample.mjs"
import path from "path"
// console.log(path.basename(__filename))
// console.log(path.basename(__dirname));


// console.log(path.parse(__filename));
// console.log(path.basename(__dirname));

// console.log(path.join(__dirname, "data.json"));

// console.log(path.join("f1", "f2", "index.html"))
// console.log(path.join("/f1", "f2", "index.html"));
// console.log(path.join("/f1", "//f2", "index.html"));
// console.log(path.join("/f1", "//f2", "../index.html"));

console.log(add(2,3))
console.log(path.resolve("f1", "f2", "index.html"));
console.log(path.resolve("/f1", "f2", "index.html"));
console.log(path.resolve("/f1", "/f2", "index.html"));
console.log(path.resolve("/f1", "f2", "../index.html"));
