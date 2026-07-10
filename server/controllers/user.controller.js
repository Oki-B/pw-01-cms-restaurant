const { User } = require("../models/");
const { hashPassword } = require("../utils/bcrypt.util");

class UserController {
  static async getUsers(req, res, next) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  static async getUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(+id);
      if (!user) throw { name: "NotFound", message: "User tidak ditemukan" };
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async createUser(req, res, next) {
    try {
      const { email, password, name, phoneNumber, address } = req.body;
      //   const newUser = await User.create(req.body)
      const newUser = await User.create({
        email,
        password,
        name,
        phoneNumber,
        address,
      });

      res.status(201).json({
        message: `Successfully add new user`,
        object: { userid: newUser.id, email: newUser.email },
      });
    } catch (err) {
      next(err);
    }
  }

  static async editUserProfile(req, res, next) {
    try {
      const { id } = req.resources;
      const { name, phoneNumber, address } = req.body;
      const [rows, [user]] = await User.update(
        { name, phoneNumber, address },
        {
          where: { id: +id },
          returning: true,
        },
      );

      res.status(200).json({
        message: `Successfully updating user profile with id ${id}`,
        user,
      });
    } catch (err) {
      next(err);
    }
  }

  static async editUserCredentials(req, res, next) {
    try {
      const { id } = req.params;
      const { email, password } = req.body;

      const user = await User.findByPk(+id);
      if (!user) throw { name: "NotFound", message: "User tidak ditemukan" };

      if (!email) throw { name: "EmailRequired" };
      if (!password) throw { name: "PasswordRequired" };
      if (password.length < 8)
        throw {
          name: "InvalidRequest",
          message: "Password minimal terdiri dari 8 karakter",
        };

      const hashedPassword = hashPassword(password);

      await User.update(
        {
          email,
          password: hashedPassword,
        },
        { where: { id: +id }, returning: true },
      );

      res.status(200).json({
        message: `Successfully updating credentials for user with id ${id} with new email address is :${user.email}`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(+id);
      if (!user) throw { name: "NotFound", message: "User tidak ditemukan" };

      await User.destroy({
        where: {
          id: user.id,
        },
      });

      res.status(200).json({
        message: `Successfully delete user with id ${id}`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
