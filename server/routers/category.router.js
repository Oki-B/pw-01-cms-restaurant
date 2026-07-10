const express = require("express");
const CategoryController = require("../controllers/category.controller");
const { requireRoles } = require("../middlewares/authorization.middleware");
const router = express.Router();

// Only can be access by admin
router.use(requireRoles("admin"));

router.post("/", CategoryController.createCategory);
router.put("/:id", CategoryController.editCategory);
router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;
