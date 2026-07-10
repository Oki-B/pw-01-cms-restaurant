const { Cuisine } = require("../models/");
const { uploadToCloudinary } = require("../utils/cloudinary.util");

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
      const { originalname, buffer } = req.file;
      const { name, description, price, categoryId } = req.body;
      const authorId = req.user.id;

      if (!name)
        throw { name: "InvalidRequest", message: "nama tidak boleh kosong" };
      if (!description)
        throw {
          name: "InvalidRequest",
          message: "deskripsi tidak boleh kosong",
        };
      if (!price)
        throw { name: "InvalidRequest", message: "harga tidak boleh kosong" };
      if (!categoryId)
        throw {
          name: "InvalidRequest",
          message: "kategori tidak boleh kosong",
        };

      if (!req.file)
        throw { name: "InvalidRequest", message: "image tidak boleh kosong" };

      const image = await uploadToCloudinary(buffer, originalname);

      const cuisine = await Cuisine.create({
        name,
        description,
        price,
        imageUrl: image.secure_url,
        imagePublicId: image.public_id,
        categoryId,
        authorId,
      });

      res.status(200).json({
        message: `Successfully create new cuisine`,
        object: cuisine,
      });
    } catch (err) {
      console.log(err);
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
