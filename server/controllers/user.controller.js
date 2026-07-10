const { User } = require("../models/");

class UserController {
  static async getUsers(req, res, next) {
    try {
      // TODO : Get All Users
    } catch (err) {
      next(err);
    }
  }

  static async getUser(req, res, next) {
    try {
      // TODO : Get User by ID
    } catch (err) {
      next(err);
    }
  }

  static async createUser(req, res, next) {
    try {
      // TODO : Create new User by ID
    } catch (err) {
      next(err);
    }
  }

  static async editUser(req, res, next) {
    try {
      // TODO : Edit User by ID
    } catch (err) {
      next(err);
    }
  }

  static async editUserPassword(req, res, next) {
    try {
      // TODO : Edit User Password
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
