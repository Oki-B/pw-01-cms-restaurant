const { Cuisine } = require("../models/");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../utils/cloudinary.util");

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

  static async createCuisine(req, res, next) {
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

      res.status(201).json({
        message: `Successfully create new cuisine`,
        object: cuisine,
      });
    } catch (err) {
      next(err);
    }
  }

  static async editCuisine(req, res, next) {
    try {
      const { id, imagePublicId } = req.resources;
      const { name, description, price, categoryId } = req.body;

      // Handle image on cloudinary
      let image = {};

      if (req.file) {
        image = await uploadToCloudinary(
          req.file.buffer,
          req.file.originalname,
        );

        if (imagePublicId) {
          await deleteFromCloudinary(imagePublicId);
        }
      }

      // Update to DB
      const [rows, [updatedCuisine]] = await Cuisine.update(
        {
          name,
          description,
          price,
          categoryId,
          imageUrl: image.secure_url,
          imagePublicId: image.public_id,
        },
        {
          where: { id: +id },
          returning: true,
        },
      );

      res.status(200).json({
        message: `Succesfully updating cuisine with id ${id}`,
        updatedCuisine,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteCuisine(req, res, next) {
    try {
      const { id, name, imagePublicId } = req.resources;
      await Cuisine.destroy({ where: { id } });

      if (imagePublicId) {
        await deleteFromCloudinary(imagePublicId);
      }

      res.status(200).json({
        message: `Successfully deleting ${name} with id ${id}`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CuisineController;
