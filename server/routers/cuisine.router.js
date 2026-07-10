const express = require("express");
const CuisineController = require("../controllers/cuisine.controller");
const {
  authorizeOwnership,
} = require("../middlewares/authorization.middleware");
const { Cuisine } = require("../models/");
const router = express.Router();

// Create new cuisine
router.post(
  "/",
  authorizeOwnership(Cuisine, `authorId`, `Cuisine`),
  CuisineController.postCuisine,
);

// Edit cuisine by ID
router.put(
  "/:id",
  authorizeOwnership(Cuisine, `authorId`, `Cuisine`),
  CuisineController.editCuisine,
);

// Delete cuisine by ID
router.delete(
  "/:id",
  authorizeOwnership(Cuisine, `authorId`, `Cuisine`),
  CuisineController.deleteCuisine,
);

module.exports = router;
