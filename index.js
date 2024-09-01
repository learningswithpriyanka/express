const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const { connectMongoDB } = require("./connect");
const { logger } = require("./middlewares")

const userRouter = require("./routes/user")
const authRouter = require("./routes/auth");

const registerRouter = require("./routes/register");

const app = express();

connectMongoDB("mongodb://127.0.0.1:27017/express")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });


//Midlewares or Hooks and they should be the first one to work
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(logger("log.txt"))
app.use("/register", registerRouter)
app.use("/login",authRouter)
app.use("/users", userRouter)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
