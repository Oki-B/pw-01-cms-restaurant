const express = require("express");
const UserController = require("../controllers/user.controller");
const router = express.Router();

router.get("/", UserController.getUsers); // Get all users
router.post("/", UserController.createUser); // Post new user

router.get("/:id", UserController.getUser); // Get user by Id
router.delete("/:id", UserController.deleteUser); // Delete user by Id

router.patch("/:id", UserController.editUserProfile); // Change profile info

router.patch("/:id/credentials", UserController.editUserCredentials); // Change password

module.exports = router;
