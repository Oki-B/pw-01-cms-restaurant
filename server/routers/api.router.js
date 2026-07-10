const express = require("express");
const CategoryController = require("../controllers/category.controller");
const CuisineController = require("../controllers/cuisine.controller");
const router = express.Router();

// Endpoint for public use
router.get("/cuisines", CuisineController.getCuisines);
router.get("/categories", CategoryController.getCategories);

router.get("/cuisines/:id", CuisineController.getCuisine);

module.exports = router;
