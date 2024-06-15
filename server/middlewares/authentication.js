const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    let bearerToken = req.headers.authorization;

    if (!bearerToken) {
      throw { name: "Token Unauthorized" };
    }

    bearerToken = bearerToken.split(" ")[1];

    const verified = verifyToken(bearerToken);

    const findUser = await User.findOne({
      where: {
        id: verified.id,
      },
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });

    if (!findUser) {
      throw { name: "Token Unauthorized" };
    }

    req.user = {
      id: findUser.id,
      role: findUser.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
