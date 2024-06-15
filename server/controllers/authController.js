const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");

class authController {
  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username) {
        throw { name: "username required" };
      } else if (!password) {
        throw { name: "password required" };
      }

      const findUser = await User.findOne({
        where: {
          username,
        },
      });

      if (!findUser) {
        throw { name: "Unauthorized" };
      }

      const validatePassword = comparePassword(password, findUser.password);

      if (!validatePassword) {
        throw { name: "Unauthorized" };
      }

      const access_token = createToken({
        id: findUser.id,
        role: findUser.role,
      });

      res.status(200).json({
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }
  // end auth controller
}

module.exports = authController;
