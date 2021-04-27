const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const apiRouter = require("./routes/apiRouter");
const optionController = require("./controllers/optionsController");

app.use(express.json());

app.use("/users", userRouter);
app.use("/api/v1", apiRouter);

app.options("/", optionController.options_get);

module.exports = app;
