const express = require("express");
const router = express.Router();

router.get("/"); // Get all users
router.post("/"); // Post new user

router.get("/:id"); // Get user by Id
router.delete("/:id"); // Delete user by Id

router.put("/:id"); // Change profile info
router.patch("/:id"); // Change password

module.exports = router;
