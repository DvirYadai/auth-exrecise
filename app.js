const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const apiRouter = require("./routes/apiRouter");

app.use(express.json());

app.use("/users", userRouter);
app.use("/api/v1", apiRouter);

module.exports = app;
