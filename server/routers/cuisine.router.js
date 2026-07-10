const express = require("express");
const CuisineController = require("../controllers/cuisine.controller");
const {
  authorizeOwnership,
} = require("../middlewares/authorization.middleware");
const { Cuisine } = require("../models/");
const upload = require("../middlewares/multer.middleware");
const router = express.Router();

// Create new cuisine
router.post(
  "/",
  upload.single("imageFile"),
  CuisineController.postCuisine,
);

// Edit cuisine by ID
router.put(
  "/:id",
  authorizeOwnership(Cuisine, `authorId`, `Cuisine`),
  upload.single("imageFile"),
  CuisineController.editCuisine,
);

// Delete cuisine by ID
router.delete(
  "/:id",
  authorizeOwnership(Cuisine, `authorId`, `Cuisine`),
  CuisineController.deleteCuisine,
);

module.exports = router;
