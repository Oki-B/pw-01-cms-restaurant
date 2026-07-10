const express = require("express");
const router = express.Router();

// Router List
const apiRouter = require("./api.router");
const userRouter = require("./user.router");
const categoryRouter = require("./category.router");
const cuisineRouter = require("./cuisine.router");

const AuthController = require("../controllers/auth.controller");
const { authentication } = require("../middlewares/authentication.middleware");

// Public API
router.use("/api", apiRouter);

// Authentication
router.post("/login", AuthController.login);
router.use(authentication);

// Content Management Service
router.use("/user", userRouter);
router.use("/cuisine", cuisineRouter);
router.use("/category", categoryRouter);

module.exports = router;
