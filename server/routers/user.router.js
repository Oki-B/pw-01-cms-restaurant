const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");
const {
  requireRoles,
  authorizeOwnership,
} = require("../middlewares/authorization.middleware");
const { User } = require("../models/");

router.get("/", requireRoles("admin"), UserController.getUsers); // Get all users
router.post("/", requireRoles("admin"), UserController.createUser); // Post new user
router.delete("/:id", requireRoles("admin"), UserController.deleteUser); // Delete user by Id

router.get("/:id", UserController.getUser); // Get user by Id

// Change profile info
router.patch(
  "/:id",
  authorizeOwnership(User, `id`, `User`),
  UserController.editUserProfile,
);

// Change email and/or password
router.patch(
  "/:id/credentials",
  requireRoles("admin"),
  UserController.editUserCredentials,
);

module.exports = router;
