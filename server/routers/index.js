const express = require("express");
const router = express.Router();

const apiRouter = require("./api.router");
const userRouter = require("./user.router");
const categoryRouter = require("./category.router");
const AuthController = require("../controllers/auth.controller");
const { authentication } = require("../middlewares/authentication.middleware");

router.use("/api", apiRouter);

router.post("/login", AuthController.login);

router.use(authentication);

router.use("/user", userRouter);

router.use("/category", categoryRouter);

module.exports = router;
