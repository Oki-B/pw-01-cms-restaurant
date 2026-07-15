"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cuisine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cuisine.belongsTo(models.Category, { foreignKey: "categoryId", as: "category" });
      Cuisine.belongsTo(models.User, { foreignKey: "authorId", as: "author" });
    }
  }
  Cuisine.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Nama tidak boleh kosong",
          },
          notEmpty: {
            msg: "Nama tidak boleh kosong",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Deskripsi tidak boleh kosong",
          },
          notEmpty: {
            msg: "Deskripsi tidak boleh kosong",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Harga tidak boleh kosong",
          },
          notEmpty: {
            msg: "Harga tidak boleh kosong",
          },
          min: {
            args: 5_000,
            msg: "Harga minimal Rp 5000,00",
          },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image URL tidak boleh kosong",
          },
          notEmpty: {
            msg: "Image URL tidak boleh kosong",
          },
        },
      },
      imagePublicId: DataTypes.STRING,
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Category tidak boleh kosong",
          },
          notEmpty: {
            msg: "Category tidak boleh kosong",
          },
        },
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Author tidak boleh kosong",
          },
          notEmpty: {
            msg: "Author tidak boleh kosong",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Cuisine",
      tableName: "cuisines",
      underscored: true,
    },
  );
  return Cuisine;
};
