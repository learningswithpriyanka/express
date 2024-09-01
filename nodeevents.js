const EventEmitter = require("node:events");

const emitter = new EventEmitter();

emitter.on("data", () => {
  console.log("Hello");
});

emitter.on("data", (num1, num2) => {
  console.log("Hello World", num1, num2);
});

emitter.emit("data", 1, 2);
