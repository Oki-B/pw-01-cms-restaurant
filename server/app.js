if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();

const router = require("./routers");
const cors = require("cors");
const errorHandler = require("./middlewares/error-handler.middleware");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API for Restaurant CMS is Ready to use!");
});
app.use(router);
app.use(errorHandler);

module.exports = app;
