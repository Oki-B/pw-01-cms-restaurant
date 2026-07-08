const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("App is ready!");
});

module.exports = app;
