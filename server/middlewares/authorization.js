const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const adminAuth = async (req, res, next) => {
  try {
    const { id, role } = req.user;
    if (role === "admin") {
      next();
    } else {
      throw { name: "Forbiden" };
    }
  } catch (error) {
    next(error);
  }
};

const approverAuth = async (req, res, next) => {
  try {
    const { id, role } = req.user;
    if (role === "approver") {
      next();
    } else {
      throw { name: "Forbiden" };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { adminAuth, approverAuth };
