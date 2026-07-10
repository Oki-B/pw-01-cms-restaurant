const { Cuisine } = require("../models/");

class CuisineController {
  static async getCuisines(req, res, next) {
    try {
      const cuisines = await Cuisine.findAll();

      res.status(200).json(cuisines);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getCuisine(req, res, next) {
    try {
      const { id } = req.params;

      const cuisine = await Cuisine.findByPk(+id, {
        attributes: { exclude: ["authorId", "createdAt", "updatedAt"] },
      });

      if (!cuisine) throw { name: "NotFound", message: "Cuisine not found" };
      res.status(200).json(cuisine);
    } catch (err) {
      next(err);
    }
  }

  static async postCuisine(req, res, next) {
    try {
      // TODO: Create new cuisine
      const { originalname, buffer } = req.file;
      res.status(200).json({ originalname, buffer });
    } catch (err) {
      next(err);
    }
  }

  static async editCuisine(req, res, next) {
    try {
      // TODO: Edit cuisine by ID
    } catch (err) {
      next(err);
    }
  }

  static async deleteCuisine(req, res, next) {
    try {
      // TODO: Delete cuisine by ID
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CuisineController;
