const express = require("express");
const router = express.Router();

const apiRouter = require("./api.router");
const AuthController = require("../controllers/auth.controller");
const { authentication } = require("../middlewares/authentication.middleware");

router.use("/api", apiRouter);

router.post("/login", AuthController.login);

router.use(authentication);

module.exports = router;
