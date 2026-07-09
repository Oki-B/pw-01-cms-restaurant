const { User } = require("../models/");
const { verifyToken } = require("../utils/jwt.util");

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw { name: "Unauthenticated" };

    const token = authorization.split(" ")[1];
    const payload = verifyToken(token);
    const user = await User.findByPk(payload.id);

    if (!user) throw { name: "Unauthenticated" };
    req.user = { id: user.id, role: user.role };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authentication };
