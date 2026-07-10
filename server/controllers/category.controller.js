const { Category } = require("../models/");

class CategoryController {
  static async getCategories(req, res, next) {
    try {
      const categories = await Category.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }

  static async createCategory(req, res, next) {
    try {
      const { name } = req.body;

      const newCategory = await Category.create({ name });

      res.status(201).json({
        message: "Succesfully create new category",
        object: {
          id: newCategory.id,
          name: newCategory.name,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async editCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const category = await Category.findByPk(+id);

      if (!category) throw { name: "NotFound", message: "Category tidak ditemukan" };

      const [rows, [updatedCategory]] = await Category.update(
        {
          name,
        },
        {
          where: {
            id: category.id,
          },
          returning: true,
        },
      );

      res.status(200).json({
        message: "Succesfully updated category",
        object: {
          id: updatedCategory.id,
          name: updatedCategory.name,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;

      const category = await Category.findByPk(+id);
      if (!category) throw { name: "NotFound", message: "Category tidak ditemukan" };

      await Category.destroy({
        where: {
          id: category.id,
        },
      });

      res.status(200).json({
        message: "Succesfully delete category",
        object: {
          id: category.id,
          name: category.name,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryController;
