const express = require("express");
const cors = require("cors");
const taskRoute = require("./router/taskRouters");
const { model } = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v2/tasks", taskRoute);

module.exports = app;
