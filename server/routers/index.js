const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    res.send("Router ready!");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
