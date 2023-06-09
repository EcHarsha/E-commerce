const express = require("express");
const mainRouter = require("./Routers/mainRouter");
const service = require("./service/mailService");
require("./model/config");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/", mainRouter);

const server = app.listen(9999, () => {
  console.log(`server runs at ${process.env.PORT}`);
});

module.exports = server;
