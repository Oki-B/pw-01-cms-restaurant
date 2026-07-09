const { User } = require("../models/");
const { comparePassword } = require("../utils/bcrypt.util");
const { signToken } = require("../utils/jwt.util");

class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "EmailRequired" };
      if (!password) throw { name: "PasswordRequired" };

      const user = await User.findOne({ where: { email } });

      if (!user) throw { name: "InvalidCredentials" };
      const correctPassword = comparePassword(password, user.password);
      if (!correctPassword) throw { name: "InvalidCredentials" };

      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;
